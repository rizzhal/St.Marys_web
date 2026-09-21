'use client'

// import React, { useState } from 'react'
// import { motion } from 'framer-motion'
// import { FileText, Users, BookOpen, CheckCircle, Calendar, IndianRupee, Download, GraduationCap } from 'lucide-react'
// import SectionWrapper from '../../components/common/SectionWrapper.jsx'
// import Accordion from '../../components/common/Accordion.jsx'

// const Admission = () => {
//   const [activeTab, setActiveTab] = useState('eligibility')

//   const faqItems = [
//     {
//       title: 'What is the admission process?',
//       content: 'The admission process includes filling out the application form, submission of required documents, and an entrance test (if applicable). Contact the school office for more details.'
//     },
//     {
//       title: 'What are the documents required?',
//       content: 'Required documents include: Birth certificate, Previous academic records, Transfer certificate (if applicable), Aadhar card, Passport size photographs, and Parent\'s ID proof.'
//     },
//     {
//       title: 'What is the fee structure?',
//       content: 'The fee structure varies by class. Please contact the school office or visit the admission office for the detailed fee schedule.'
//     },
//     {
//       title: 'Is there any entrance test?',
//       content: 'Yes, students seeking admission to higher classes may need to take an entrance test. The test assesses the student\'s academic readiness.'
//     }
//   ]

//   const documents = [
//     'Registration Card',
//     'Admit Card of Class X Board Examination',
//     'Marksheet of Class X Pre-Board Examination',
//     'Pass certificate of Class X Board Examination',
//     'Class IX Final Mark Sheet',
//     'Original Transfer Certificate from the school last attended at the time of admission',
//     'Character certificate from the School last attended',
//     'Migration certificate for CBSE students (compulsory)',
//     'School CCE Evaluation Card (IX-X) for CBSE School students(compulsory)',
//     'School Report Card of Class-X(ten) for SEBA School students',
//     'SC/ST/OBC/MOBC/ certificate in the name of the student (if applicable)',
//     'Detailed report of co-curricular achievements (National/District/State)'
//   ]

//   const feeStructure = [
//     { label: 'Admission Fees', amount: '₹16,000/-' },
//     { label: 'Tuition fees per month', amount: '₹1,800/-' },
//     { label: 'Tuition fees (Per Installment)', amount: '₹7,200/-' },
//     { label: 'Annual & Other Fees (Per Installment)', amount: '₹5,315/-' },
//     { label: 'Laboratory Fees (Science Stream - Per Installment)', amount: '₹2,500/-' },
//     { label: 'Computer Fees (As per selection of subjects)', amount: '₹3,100/-' },
//     { label: 'Psychology (Lab fee - As per selection of subjects)', amount: '₹1,100/-' }
//   ]

//   return (
//     <div className="min-h-screen bg-white">
//       {/* ===== HERO SECTION ===== */}
//       <section className="relative overflow-hidden bg-maroon-900 h-[30vh] min-h-[220px] max-h-[280px]">
//         {/* Background Pattern */}
//         <div className="absolute inset-0 opacity-5">
//           <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
//           <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
//         </div>

//         {/* Background Text */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//           <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">
//             ADMISSIONS
//           </span>
//         </div>

//         <div className="container-custom relative h-full flex items-center">
//           <div>
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.6 }}
//               className="flex items-center gap-3 mb-2"
//             >
//               <GraduationCap size={18} className="text-gold-400" />
//               <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Join Us</span>
//             </motion.div>

//             <motion.h1
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ delay: 0.2, duration: 0.6 }}
//               className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
//             >
//               Our <span className="text-gold-400">Admissions</span>
//             </motion.h1>

//             <motion.p
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               transition={{ delay: 0.4, duration: 0.6 }}
//               className="text-white/50 text-sm mt-1"
//             >
//               Join the St. Mary's family
//             </motion.p>
//           </div>
//         </div>

//         {/* Bottom Gold Line */}
//         <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500/50" />
//       </section>

//       {/* ===== INTRO TEXT ===== */}
//       <section className="py-12 border-b border-gray-100">
//         <div className="container-custom">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.6 }}
//             viewport={{ once: true }}
//             className="text-center max-w-3xl mx-auto"
//           >
//             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-maroon-50 border border-maroon-100 rounded-full mb-4">
//               <Users size={14} className="text-maroon-700" />
//               <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Admissions Open</span>
//             </div>
//             <p className="text-gray-600 text-lg leading-relaxed">
//               St. Mary's Higher Secondary School welcomes students from Class 5 to 10.
//               Our admission process is designed to be transparent and student-friendly.
//             </p>
//           </motion.div>
//         </div>
//       </section>

//       {/* ===== MAIN CONTENT ===== */}
//       <section className="section-padding bg-white">
//         <div className="container-custom">
//           <SectionWrapper>
//             <div className="text-center max-w-3xl mx-auto mb-12">
//               <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-800 mb-4">
//                 Welcome to <span className="text-gold-600">St. Mary's</span>
//               </h2>
//               <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
//             </div>
//           </SectionWrapper>

//           {/* Tab Buttons */}
//           <SectionWrapper>
//             <div className="flex flex-wrap justify-center gap-4 mb-10">
//               <button
//                 onClick={() => setActiveTab('eligibility')}
//                 className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
//                   activeTab === 'eligibility'
//                     ? 'bg-maroon-700 text-white shadow-lg'
//                     : 'bg-gray-100 text-gray-700 hover:bg-maroon-700 hover:text-white-700'
//                 }`}
//               >
//                 <FileText size={18} className="inline mr-2" />
//                 Eligibility Criteria
//               </button>
//               <button
//                 onClick={() => setActiveTab('prospectus')}
//                 className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ${
//                   activeTab === 'prospectus'
//                     ? 'bg-maroon-700 text-white shadow-lg'
//                     : 'bg-gray-100 text-gray-700 hover:bg-maroon-100 hover:text-maroon-700'
//                 }`}
//               >
//                 <BookOpen size={18} className="inline mr-2" />
//                 Admission Prospectus
//               </button>
//             </div>
//           </SectionWrapper>

//           {/* Eligibility Tab Content */}
//           {activeTab === 'eligibility' && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//             >
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                 {/* Left Column - Cut-off Marks */}
//                 <SectionWrapper>
//                   <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
//                     <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
//                       <CheckCircle size={22} className="text-gold-600" />
//                       Cut-off Marks
//                     </h3>
//                     <p className="text-sm text-gray-500 mb-4">CGPA or equivalent marks</p>
                    
//                     <div className="space-y-4">
//                       <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-semibold text-gray-800">Humanities</p>
//                             <p className="text-sm text-gray-600">English & Social Science</p>
//                           </div>
//                           <span className="text-2xl font-bold text-blue-700">45%</span>
//                         </div>
//                       </div>
                      
//                       <div className="bg-green-50 border border-green-200 rounded-xl p-4">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-semibold text-gray-800">Science Stream</p>
//                             <p className="text-sm text-gray-600">Science & Mathematics</p>
//                           </div>
//                           <span className="text-2xl font-bold text-green-700">45%</span>
//                         </div>
//                       </div>
                      
//                       <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
//                         <div className="flex justify-between items-center">
//                           <div>
//                             <p className="font-semibold text-gray-800">Commerce Stream</p>
//                             <p className="text-sm text-gray-600">Social Science & Mathematics</p>
//                           </div>
//                           <span className="text-2xl font-bold text-amber-700">45%</span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </SectionWrapper>

//                 {/* Right Column - Admission Procedure */}
//                 <SectionWrapper>
//                   <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
//                     <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
//                       <Calendar size={22} className="text-gold-600" />
//                       Admission Procedure
//                     </h3>
                    
//                     <ul className="space-y-3 text-sm text-gray-700">
//                       <li className="flex items-start gap-2">
//                         <span className="text-maroon-600 font-bold">•</span>
//                         <span>Submit the duly filled admission form and take admission on or within 3 days of the issue of form.</span>
//                       </li>
//                       <li className="flex items-start gap-2">
//                         <span className="text-maroon-600 font-bold">•</span>
//                         <span>Admission will be granted into preferred streams according to the availability of seats.</span>
//                       </li>
//                       <li className="flex items-start gap-2">
//                         <span className="text-maroon-600 font-bold">•</span>
//                         <span>Admission will stand automatically cancelled if admission is not taken on the dates announced.</span>
//                       </li>
//                     </ul>

//                     <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
//                       <p className="text-xs text-red-700 font-semibold">
//                         ⚠️ NO REFUND OF ANY KIND SHALL BE MADE ONCE ADMISSION IS TAKEN.
//                       </p>
//                     </div>
//                   </div>
//                 </SectionWrapper>
//               </div>

//               {/* Documents Required */}
//               <SectionWrapper>
//                 <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-6">
//                   <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
//                     <FileText size={22} className="text-gold-600" />
//                     Documents Required
//                   </h3>
//                   <p className="text-sm text-gray-500 mb-4">The following self-attested documents are to be submitted along with the application:</p>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//                     {documents.map((doc, index) => (
//                       <div key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white transition-colors">
//                         <span className="text-maroon-600 text-sm font-bold">{index + 1}.</span>
//                         <span className="text-sm text-gray-700">{doc}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </SectionWrapper>

//               {/* Fee Structure */}
//               <SectionWrapper>
//                 <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-6">
//                   <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
//                     <IndianRupee size={22} className="text-gold-600" />
//                     Fee Structure
//                   </h3>
                  
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     {feeStructure.map((fee, index) => (
//                       <div key={index} className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
//                         <span className="text-sm text-gray-700">{fee.label}</span>
//                         <span className="font-bold text-maroon-700">{fee.amount}</span>
//                       </div>
//                     ))}
//                   </div>

//                   <div className="mt-4 p-4 bg-maroon-50 border border-maroon-200 rounded-xl">
//                     <p className="text-sm text-maroon-800">
//                       <span className="font-bold">Note:</span> Admission Fees and 1st Installment should be paid at the time of Admission.
//                       Registration Fee will be taken when AHSEC gives information.
//                     </p>
//                   </div>

//                   <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                     <p className="text-sm text-blue-800">
//                       <span className="font-bold">📞 For further information contact School Office:</span> PH. No. 9435190537
//                     </p>
//                   </div>
//                 </div>
//               </SectionWrapper>

//               {/* Important Notes */}
//               <SectionWrapper>
//                 <div className="mt-8 bg-maroon-50 border border-maroon-200 rounded-2xl p-6">
//                   <h4 className="font-bold text-maroon-800 text-sm mb-3">⚠️ Important Notes:</h4>
//                   <ul className="space-y-2 text-sm text-maroon-700">
//                     <li className="flex items-start gap-2">
//                       <span className="font-bold">•</span>
//                       <span>INCOMPLETE FORMS WILL BE REJECTED UPON SCRUTINY.</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <span className="font-bold">•</span>
//                       <span>SUBMISSION OF FORMS DOES NOT RESERVE THE RIGHT TO ADMISSION.</span>
//                     </li>
//                     <li className="flex items-start gap-2">
//                       <span className="font-bold">•</span>
//                       <span>FINAL DISCRETION LIES WITH THE PRINCIPAL IN ALL MATTERS.</span>
//                     </li>
//                   </ul>
//                 </div>
//               </SectionWrapper>
//             </motion.div>
//           )}

//           {/* Prospectus Tab Content */}
//           {activeTab === 'prospectus' && (
//             <motion.div
//               initial={{ opacity: 0, y: 20 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{ duration: 0.5 }}
//               className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-200"
//             >
//               <div className="max-w-md mx-auto px-4">
//                 <div className="inline-flex p-6 bg-white rounded-2xl shadow-lg mb-6 border border-gray-200">
//                   <Download size={48} className="text-maroon-700" />
//                 </div>
//                 <h3 className="text-2xl font-serif font-bold text-maroon-800 mb-3">
//                   Admission Prospectus
//                 </h3>
//                 <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
//                 <p className="text-gray-600 text-base leading-relaxed">
//                   The admission prospectus will be available for download soon.
//                   Please check back later or contact the school office for more information.
//                 </p>
//                 <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
//                   <p className="text-sm text-gray-600">
//                     📞 Contact: <span className="font-semibold text-maroon-700">9435190537</span>
//                   </p>
//                   <p className="text-sm text-gray-600 mt-1">
//                     ✉️ Email: <span className="font-semibold text-maroon-700">stmarysghy1924@yahoo.com</span>
//                   </p>
//                 </div>
//               </div>
//             </motion.div>
//           )}

//           {/* FAQ Section - Common for both tabs */}
//           <SectionWrapper>
//             <div className="mt-12 bg-gray-50 rounded-2xl border border-gray-200 p-6">
//               <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 text-center">
//                 Frequently Asked Questions
//               </h3>
//               <Accordion items={faqItems} />
//             </div>
//           </SectionWrapper>
//         </div>
//       </section>
//     </div>
//   )
// }

// export default Admission

















import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, Users, BookOpen, CheckCircle, Calendar, IndianRupee, Download, GraduationCap } from 'lucide-react'
import SectionWrapper from '../../components/common/SectionWrapper.jsx'
import Accordion from '../../components/common/Accordion.jsx'

const Admission = () => {
  const [activeTab, setActiveTab] = useState('eligibility')

  const faqItems = [
    {
      title: 'What is the admission process?',
      content: 'The admission process includes filling out the application form, submission of required documents, and an entrance test (if applicable). Contact the school office for more details.'
    },
    {
      title: 'What are the documents required?',
      content: 'Required documents include: Birth certificate, Previous academic records, Transfer certificate (if applicable), Aadhar card, Passport size photographs, and Parent\'s ID proof.'
    },
    {
      title: 'What is the fee structure?',
      content: 'The fee structure varies by class. Please contact the school office or visit the admission office for the detailed fee schedule.'
    },
    {
      title: 'Is there any entrance test?',
      content: 'Yes, students seeking admission to higher classes may need to take an entrance test. The test assesses the student\'s academic readiness.'
    }
  ]

  // ----- Updated Documents -----
  const documentsKgTo8 = [
    'Birth Certificate',
    'Aadhar Card',
    'Previous Class Marksheet',
    'Transfer Certificate from previous school (other than KG)'
  ]

  const documentsHs = [
    'HSLC Marksheet',
    'Registration Card',
    'Transfer Certificate from previous school',
    'Migration Certificate (for CBSE students)',
    'Admit Card of Class 10',
    'Pass Certificate of Class 10'
  ]

  const feeStructure = [
    { label: 'Admission Fees', amount: '₹16,000/-' },
    { label: 'Tuition fees per month', amount: '₹1,800/-' },
    { label: 'Tuition fees (Per Installment)', amount: '₹7,200/-' },
    { label: 'Annual & Other Fees (Per Installment)', amount: '₹5,315/-' },
    { label: 'Laboratory Fees (Science Stream - Per Installment)', amount: '₹2,500/-' },
    { label: 'Computer Fees (As per selection of subjects)', amount: '₹3,100/-' },
    { label: 'Psychology (Lab fee - As per selection of subjects)', amount: '₹1,100/-' }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-maroon-900 h-[30vh] min-h-[220px] max-h-[280px]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-400 rounded-full -translate-y-1/2 translate-x-1/3" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gold-300 rounded-full translate-y-1/2 -translate-x-1/3" />
        </div>

        {/* Background Text */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[80px] md:text-[120px] font-serif font-bold text-white/5 tracking-[0.3em] select-none">
            ADMISSIONS
          </span>
        </div>

        <div className="container-custom relative h-full flex items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-3 mb-2"
            >
              <GraduationCap size={18} className="text-gold-400" />
              <span className="text-xs font-semibold text-gold-400 tracking-[0.2em] uppercase">Join Us</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-white"
            >
              Our <span className="text-gold-400">Admissions</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-white/50 text-sm mt-1"
            >
              Join the St. Mary's family
            </motion.p>
          </div>
        </div>

        {/* Bottom Gold Line */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-500/50" />
      </section>

      {/* ===== INTRO TEXT ===== */}
      <section className="py-12 border-b border-gray-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-maroon-50 border border-maroon-100 rounded-full mb-4">
              <Users size={14} className="text-maroon-700" />
              <span className="text-xs font-semibold text-maroon-700 tracking-widest uppercase">Admissions Open</span>
            </div>
            <p className="text-gray-600 text-lg leading-relaxed">
              St. Mary's Higher Secondary School welcomes students from Class 5 to 10.
              Our admission process is designed to be transparent and student-friendly.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ===== MAIN CONTENT ===== */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionWrapper>
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-maroon-800 mb-4">
                Welcome to <span className="text-gold-600">St. Mary's</span>
              </h2>
              <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
            </div>
          </SectionWrapper>

          {/* ===== TAB BUTTONS (FIXED VISIBILITY) ===== */}
          <SectionWrapper>
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              <button
                onClick={() => setActiveTab('eligibility')}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border-2 ${
                  activeTab === 'eligibility'
                    ? 'bg-maroon-700 text-white border-gold-400 shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-transparent hover:bg-maroon-700 hover:text-white hover:border-gold-400'
                }`}
              >
                <FileText size={18} className="inline mr-2" />
                Eligibility Criteria
              </button>
              <button
                onClick={() => setActiveTab('prospectus')}
                className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 border-2 ${
                  activeTab === 'prospectus'
                    ? 'bg-maroon-700 text-white border-gold-400 shadow-lg'
                    : 'bg-gray-100 text-gray-700 border-transparent hover:bg-maroon-700 hover:text-white hover:border-gold-400'
                }`}
              >
                <BookOpen size={18} className="inline mr-2" />
                Admission Prospectus
              </button>
            </div>
          </SectionWrapper>

          {/* Eligibility Tab Content */}
          {activeTab === 'eligibility' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Cut-off Marks */}
                <SectionWrapper>
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                    <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
                      <CheckCircle size={22} className="text-gold-600" />
                      Cut-off Marks
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">CGPA or equivalent marks</p>
                    
                    <div className="space-y-4">
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800">Humanities</p>
                            <p className="text-sm text-gray-600">English & Social Science</p>
                          </div>
                          <span className="text-2xl font-bold text-blue-700">45%</span>
                        </div>
                      </div>
                      
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800">Science Stream</p>
                            <p className="text-sm text-gray-600">Science & Mathematics</p>
                          </div>
                          <span className="text-2xl font-bold text-green-700">45%</span>
                        </div>
                      </div>
                      
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold text-gray-800">Commerce Stream</p>
                            <p className="text-sm text-gray-600">Social Science & Mathematics</p>
                          </div>
                          <span className="text-2xl font-bold text-amber-700">45%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </SectionWrapper>

                {/* Right Column - Admission Procedure */}
                <SectionWrapper>
                  <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6">
                    <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
                      <Calendar size={22} className="text-gold-600" />
                      Admission Procedure
                    </h3>
                    
                    <ul className="space-y-3 text-sm text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-maroon-600 font-bold">•</span>
                        <span>Submit the duly filled admission form and take admission on or within 3 days of the issue of form.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-maroon-600 font-bold">•</span>
                        <span>Admission will be granted into preferred streams according to the availability of seats.</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-maroon-600 font-bold">•</span>
                        <span>Admission will stand automatically cancelled if admission is not taken on the dates announced.</span>
                      </li>
                    </ul>

                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl">
                      <p className="text-xs text-red-700 font-semibold">
                        ⚠️ NO REFUND OF ANY KIND SHALL BE MADE ONCE ADMISSION IS TAKEN.
                      </p>
                    </div>
                  </div>
                </SectionWrapper>
              </div>

              {/* ===== DOCUMENTS REQUIRED (UPDATED) ===== */}
              <SectionWrapper>
                <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
                    <FileText size={22} className="text-gold-600" />
                    Documents Required
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    The following self-attested documents are to be submitted along with the application.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* KG to Class 8 */}
                    <div>
                      <h4 className="font-semibold text-maroon-700 mb-3 flex items-center gap-2">
                        <span className="text-gold-500">📘</span> For KG to Class 8
                      </h4>
                      <ul className="space-y-2">
                        {documentsKgTo8.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white transition-colors">
                            <span className="text-maroon-600 text-sm font-bold">{index + 1}.</span>
                            <span className="text-sm text-gray-700">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Class 9 & 10 (HSLC) */}
                    <div>
                      <h4 className="font-semibold text-maroon-700 mb-3 flex items-center gap-2">
                        <span className="text-gold-500">🎓</span> For Class 9 & 10 (HSLC)
                      </h4>
                      <ul className="space-y-2">
                        {documentsHs.map((doc, index) => (
                          <li key={index} className="flex items-start gap-2 p-2 rounded-lg hover:bg-white transition-colors">
                            <span className="text-maroon-600 text-sm font-bold">{index + 1}.</span>
                            <span className="text-sm text-gray-700">{doc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </SectionWrapper>

              {/* Fee Structure */}
              {/* <SectionWrapper>
                <div className="mt-8 bg-gray-50 rounded-2xl border border-gray-200 p-6">
                  <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 flex items-center gap-2">
                    <IndianRupee size={22} className="text-gold-600" />
                    Fee Structure
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {feeStructure.map((fee, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-white rounded-xl border border-gray-200">
                        <span className="text-sm text-gray-700">{fee.label}</span>
                        <span className="font-bold text-maroon-700">{fee.amount}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 p-4 bg-maroon-50 border border-maroon-200 rounded-xl">
                    <p className="text-sm text-maroon-800">
                      <span className="font-bold">Note:</span> Admission Fees and 1st Installment should be paid at the time of Admission.
                      Registration Fee will be taken when AHSEC gives information.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                    <p className="text-sm text-blue-800">
                      <span className="font-bold">📞 For further information contact School Office:</span> PH. No. 9435190537
                    </p>
                  </div>
                </div>
              </SectionWrapper> */}

              {/* Important Notes */}
              <SectionWrapper>
                <div className="mt-8 bg-maroon-50 border border-maroon-200 rounded-2xl p-6">
                  <h4 className="font-bold text-maroon-800 text-sm mb-3">⚠️ Important Notes:</h4>
                  <ul className="space-y-2 text-sm text-maroon-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>INCOMPLETE FORMS WILL BE REJECTED UPON SCRUTINY.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>SUBMISSION OF FORMS DOES NOT RESERVE THE RIGHT TO ADMISSION.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold">•</span>
                      <span>FINAL DISCRETION LIES WITH THE PRINCIPAL IN ALL MATTERS.</span>
                    </li>
                  </ul>
                </div>
              </SectionWrapper>
            </motion.div>
          )}

          {/* Prospectus Tab Content */}
          {activeTab === 'prospectus' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center py-16 bg-gray-50 rounded-3xl border border-gray-200"
            >
              <div className="max-w-md mx-auto px-4">
                <div className="inline-flex p-6 bg-white rounded-2xl shadow-lg mb-6 border border-gray-200">
                  <Download size={48} className="text-maroon-700" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-maroon-800 mb-3">
                  Admission Prospectus
                </h3>
                <div className="w-16 h-0.5 bg-gold-400 mx-auto mb-4" />
                <p className="text-gray-600 text-base leading-relaxed">
                  The admission prospectus will be available for download soon.
                  Please check back later or contact the school office for more information.
                </p>
                <div className="mt-6 p-4 bg-white rounded-xl border border-gray-200">
                  <p className="text-sm text-gray-600">
                    📞 Contact: <span className="font-semibold text-maroon-700">9435190537</span>
                  </p>
                  <p className="text-sm text-gray-600 mt-1">
                    ✉️ Email: <span className="font-semibold text-maroon-700">stmarysghy1924@yahoo.com</span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* FAQ Section - Common for both tabs */}
          <SectionWrapper>
            <div className="mt-12 bg-gray-50 rounded-2xl border border-gray-200 p-6">
              <h3 className="font-serif font-bold text-xl text-maroon-800 mb-4 text-center">
                Frequently Asked Questions
              </h3>
              <Accordion items={faqItems} />
            </div>
          </SectionWrapper>
        </div>
      </section>
    </div>
  )
}

export default Admission