<x-app-layout>
   <div class="min-h-screen flex flex-col sm:ml-64">
      <div class="flex-grow p-4">
         <div class="p-4">           
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-violet-100 p-2 rounded-full">
                           <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"/>
                           </svg>


                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Subject</p>
                           <p class="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-green-100 p-2 rounded-full">
                           <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.827 5.465-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.769c.44 2.345 2.383 2.588 2.6 3.761.11.586.22 1.171-.31 1.271l-12.7 2.377c-.529.099-.639-.488-.749-1.074C5.813 16.73 7.538 15.8 7.1 13.455c-.219-1.169.218 1.162-.33-1.769a5.338 5.338 0 0 1 4.058-6.221Zm-7.046 4.41c.143-1.877.822-3.461 2.086-4.856m2.646 13.633a3.472 3.472 0 0 0 6.728-.777l.09-.5-6.818 1.277Z"/>
                           </svg>


                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Present</p>
                           <p class="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-orange-100 p-2 rounded-full">
                           <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                              <path fill-rule="evenodd" d="M18.458 3.11A1 1 0 0 1 19 4v16a1 1 0 0 1-1.581.814L12 16.944V7.056l5.419-3.87a1 1 0 0 1 1.039-.076ZM22 12c0 1.48-.804 2.773-2 3.465v-6.93c1.196.692 2 1.984 2 3.465ZM10 8H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6V8Zm0 9H5v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3Z" clip-rule="evenodd"/>
                           </svg>


                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Absent</p>
                           <p class="text-2xl font-bold text-gray-900 dark:text-white">0</p>
                     </div>
                  </div>
               </div>
            
            <div id="student-watch-position"></div>
         </div>
      </div>
   </div> 
</x-app-layout>
