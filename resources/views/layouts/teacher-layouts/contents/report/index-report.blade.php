<x-app-layout>
    <div class="min-h-screen flex flex-col sm:ml-64">
        <div class="flex-grow p-4">
            <div class="p-4">
            
            <div id="reports-container" class="relative bg-gradient-to-l from-lime-100 to-green-200 rounded-lg shadow dark:bg-gray-700 p-6">
               <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-green-300 pb-4 mb-4">
                  <h3 class="text-xl font-medium text-gray-900 dark:text-white">Customize Attendance Reports</h3>
            
                  <div>
                  <button type="submit" class="inline-flex items-center px-4 py-2 bg-white border border-gray-400 rounded-md font-semibold text-xs text-dark hover:text-white dark:text-gray-800 uppercase tracking-widest hover:bg-green-700 dark:hover:bg-white focus:bg-green-700 dark:focus:bg-white active:bg-green-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        <svg class="w-4 h-4 text-dark mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd"/>
                        </svg>
                        Generate Report
                  </button>

                  <button type="submit" class="inline-flex items-center px-4 py-2 bg-white border border-gray-400 rounded-md font-semibold text-xs text-dark hover:text-white dark:text-gray-800 uppercase tracking-widest hover:bg-green-700 dark:hover:bg-white focus:bg-green-700 dark:focus:bg-white active:bg-green-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        <svg class="w-4 h-4 text-dark mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm-6 9a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h.5a2.5 2.5 0 0 0 0-5H5Zm1.5 3H6v-1h.5a.5.5 0 0 1 0 1Zm4.5-3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h1.376A2.626 2.626 0 0 0 15 15.375v-1.75A2.626 2.626 0 0 0 12.375 11H11Zm1 5v-3h.375a.626.626 0 0 1 .625.626v1.748a.625.625 0 0 1-.626.626H12Zm5-5a1 1 0 0 0-1 1v5a1 1 0 1 0 2 0v-1h1a1 1 0 1 0 0-2h-1v-1h1a1 1 0 1 0 0-2h-2Z" clip-rule="evenodd"/>
                        </svg>
                        Download
                  </button>
                  </div>

               </div>
               <form id="reports-form" class="space-y-4">
                  <div class="grid gap-4 mb-6 md:grid-cols-4">
                     <div>
                        <select id="section" name="section" class="w-full px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
                        </select>
                     </div>
                     <div>
                        <select id="class_schedule" name="class_schedule" class="w-full px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
                        </select>
                     </div>
                     <div>
                        <select id="student" name="student" class="w-full px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
                        </select>
                     </div>
                     <div>
                        <select id="quarter" class="w-full px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
                        </select>
                     </div>
                  </div>

                  <div class="grid gap-4 mb-6 md:grid-cols-3">
                     <div id="date-range-picker" date-rangepicker class="flex items-center col-span-2">
                        <div class="relative flex-1">
                           <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                                 <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                 </svg>
                           </div>
                           <input id="quarter_start" name="quarter_start" type="text" class="w-full pl-10 px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2" placeholder="Select quarter start date">
                        </div>
                        <span class="mx-4 text-gray-500">to</span>
                        <div class="relative flex-1">
                        <div class="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                              </svg>
                        </div>
                        <input id="quarter_end" name="quarter_end" type="text" class="w-full pl-10 px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2" placeholder="Select quarter start date">
                     </div>
                     </div>
                  </div>
               </form>
            </div>

            </div>
        </div>
    </div>
</x-app-layout>
