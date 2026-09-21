import { NextResponse } from 'next/server'
import { connectDB } from './db.js'
import AuthMiddleware from './middleware/auth.middleware.js'
import RefreshMiddleware from './middleware/refresh.middleware.js'
import { login, logout, getSession, refreshToken, changePassword } from './controller/auth.controller.js'
import { createCircular, getCirculars, getCircularById, updateCircular, deleteCircular } from './controller/circular.controller.js'
import { createStaff, getStaff, getStaffById, updateStaff, deleteStaff } from './controller/staff.controller.js'
import { createEvent, getEvents, getEventById, getEventBySlug, updateEvent, deleteEvent, addImagesToEvent, deleteImageFromEvent, updateImageTitle } from './controller/gallery.controller.js'
import { createSyllabus, getSyllabus, getSyllabusById, getAcademicYears, getClasses, getStreams, updateSyllabus, deleteSyllabus } from './controller/syllabus.controller.js'
import { uploadImage, uploadMultipleImages, uploadPDF, deleteFile } from './controller/upload.controller.js'

const normalizeCookieOptions = (options = {}) => ({
  httpOnly: options.httpOnly ?? true,
  maxAge: options.maxAge,
  secure: process.env.NODE_ENV === 'production' ? (options.secure ?? true) : false,
  sameSite: options.sameSite ?? 'lax',
  path: options.path ?? '/',
})

const createMockResponse = () => {
  const state = { status: 200, body: null, cookies: [] }
  return {
    state,
    status(code) { state.status = code; return this },
    json(body) { state.body = body; return this },
    cookie(name, value, options = {}) {
      state.cookies.push({ name, value, options: normalizeCookieOptions(options) }); return this
    },
    clearCookie(name, options = {}) {
      state.cookies.push({ name, value: '', options: { ...normalizeCookieOptions(options), maxAge: 0 } }); return this
    },
    setHeader() { return this },
  }
}

async function parseRequest(request, params) {
  const url = new URL(request.url)
  const cookies = {}
  for (const item of (request.headers.get('cookie') || '').split(';')) {
    if (!item.trim()) continue
    const [name, ...value] = item.trim().split('=')
    cookies[name] = decodeURIComponent(value.join('='))
  }

  let body = {}
  let file
  let files
  const contentType = request.headers.get('content-type') || ''

  if (!['GET', 'HEAD'].includes(request.method)) {
    if (contentType.includes('multipart/form-data')) {
      const form = await request.formData()
      const asFile = async (value) => {
        if (!value || typeof value.arrayBuffer !== 'function') return null
        return { buffer: Buffer.from(await value.arrayBuffer()), originalname: value.name, mimetype: value.type, size: value.size }
      }
      file = await asFile(form.get('image')) || await asFile(form.get('pdf')) || undefined
      if (!file) {
        for (const [, value] of form.entries()) {
          file = await asFile(value)
          if (file) break
        }
      }
      const all = []
      for (const value of form.getAll('images')) {
        const parsed = await asFile(value)
        if (parsed) all.push(parsed)
      }
      if (all.length) files = all
    } else {
      const text = await request.text()
      body = text ? JSON.parse(text) : {}
    }
  }

  return {
    method: request.method,
    headers: Object.fromEntries(request.headers.entries()),
    body,
    params,
    query: Object.fromEntries(url.searchParams.entries()),
    cookies,
    file,
    files,
    session: undefined,
  }
}

function routeFor(method, parts) {
  const [resource, first, second] = parts
  if (resource === 'health' && method === 'GET') return { handler: (_req, res) => res.json({ status: 'OK', timestamp: new Date().toISOString() }) }

  if (resource === 'auth') {
    if (method === 'POST' && first === 'login') return { handler: login }
    if (method === 'POST' && first === 'logout') return { handler: logout, auth: true }
    if (method === 'GET' && first === 'session') return { handler: getSession }
    if (method === 'GET' && first === 'refresh-token') return { handler: refreshToken, refresh: true }
    if (method === 'PUT' && first === 'change-password') return { handler: changePassword, auth: true }
  }

  if (resource === 'circulars') {
    if (method === 'GET' && !first) return { handler: getCirculars }
    if (method === 'GET' && first) return { handler: getCircularById, params: { id: first } }
    if (method === 'POST' && !first) return { handler: createCircular, auth: true }
    if (method === 'PUT' && first) return { handler: updateCircular, auth: true, params: { id: first } }
    if (method === 'DELETE' && first) return { handler: deleteCircular, auth: true, params: { id: first } }
  }

  if (resource === 'staff') {
    if (method === 'GET' && !first) return { handler: getStaff }
    if (method === 'GET' && first) return { handler: getStaffById, params: { id: first } }
    if (method === 'POST' && !first) return { handler: createStaff, auth: true }
    if (method === 'PUT' && first) return { handler: updateStaff, auth: true, params: { id: first } }
    if (method === 'DELETE' && first) return { handler: deleteStaff, auth: true, params: { id: first } }
  }

  if (resource === 'gallery') {
    if (method === 'GET' && first === 'slug' && second) return { handler: getEventBySlug, params: { slug: second } }
    if (method === 'GET' && !first) return { handler: getEvents }
    if (method === 'GET' && first) return { handler: getEventById, params: { id: first } }
    if (method === 'POST' && first && second === 'images') return { handler: addImagesToEvent, auth: true, params: { id: first } }
    if (method === 'POST' && !first) return { handler: createEvent, auth: true }
    if (method === 'PUT' && first && second) return { handler: updateImageTitle, auth: true, params: { eventId: first, imageId: second } }
    if (method === 'PUT' && first) return { handler: updateEvent, auth: true, params: { id: first } }
    if (method === 'DELETE' && first && second) return { handler: deleteImageFromEvent, auth: true, params: { eventId: first, imageId: second } }
    if (method === 'DELETE' && first) return { handler: deleteEvent, auth: true, params: { id: first } }
  }

  if (resource === 'syllabus') {
    if (method === 'GET' && first === 'academic-years') return { handler: getAcademicYears }
    if (method === 'GET' && first === 'classes') return { handler: getClasses }
    if (method === 'GET' && first === 'streams') return { handler: getStreams }
    if (method === 'GET' && !first) return { handler: getSyllabus }
    if (method === 'GET' && first) return { handler: getSyllabusById, params: { id: first } }
    if (method === 'POST' && !first) return { handler: createSyllabus, auth: true }
    if (method === 'PUT' && first) return { handler: updateSyllabus, auth: true, params: { id: first } }
    if (method === 'DELETE' && first) return { handler: deleteSyllabus, auth: true, params: { id: first } }
  }

  if (resource === 'upload') {
    if (method === 'POST' && first === 'image') return { handler: uploadImage, auth: true }
    if (method === 'POST' && first === 'images') return { handler: uploadMultipleImages, auth: true }
    if (method === 'POST' && first === 'pdf') return { handler: uploadPDF, auth: true }
    if (method === 'DELETE' && first === 'file') return { handler: deleteFile, auth: true }
  }

  return null
}

function toNextResponse(state) {
  const response = NextResponse.json(state.body ?? {}, { status: state.status })
  for (const cookie of state.cookies) response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
}

export async function handleApiRequest(request, context) {
  try {
    await connectDB()
    const { path = [] } = await context.params
    const route = routeFor(request.method, path)
    if (!route) return NextResponse.json({ message: 'Endpoint not found' }, { status: 404 })

    const req = await parseRequest(request, route.params || {})
    const res = createMockResponse()
    let nextCalled = !route.auth && !route.refresh
    const next = () => { nextCalled = true }

    if (route.auth) await AuthMiddleware(req, res, next)
    if (route.refresh) await RefreshMiddleware(req, res, next)
    if (!nextCalled) return toNextResponse(res.state)

    await route.handler(req, res)
    return toNextResponse(res.state)
  } catch (error) {
    console.error(error)
    return NextResponse.json({ message: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error' }, { status: error.status || 500 })
  }
}
