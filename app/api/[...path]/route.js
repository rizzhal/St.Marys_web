import { handleApiRequest } from '../../../src/server/route-adapter'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const handler = (request, context) => handleApiRequest(request, context)
export const GET = handler
export const POST = handler
export const PUT = handler
export const PATCH = handler
export const DELETE = handler
export const OPTIONS = handler
