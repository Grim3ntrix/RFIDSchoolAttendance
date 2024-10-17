<x-app-layout>
    <div class="min-h-screen flex flex-col sm:ml-64">
        <div class="flex-grow p-4">
            <div class="p-4">
            
               <div id="reports-container" class="relative bg-gradient-to-l from-lime-100 to-green-200 rounded-lg shadow dark:bg-gray-700 p-6">
                  <div class="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-green-300 pb-4 mb-4">
                     <h3 class="text-xl font-medium text-gray-900 dark:text-white">Quarterly Attendance Reports</h3>
               
                     <div>
                     <button id="generate-report-btn" class="inline-flex items-center px-4 py-2 bg-white border border-gray-400 rounded-md font-semibold text-xs text-dark hover:text-white dark:text-gray-800 uppercase tracking-widest hover:bg-green-700 dark:hover:bg-white focus:bg-green-700 dark:focus:bg-white active:bg-green-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                           <svg class="w-4 h-4 text-dark mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M12 3a1 1 0 0 1 .78.375l4 5a1 1 0 1 1-1.56 1.25L13 6.85V14a1 1 0 1 1-2 0V6.85L8.78 9.626a1 1 0 1 1-1.56-1.25l4-5A1 1 0 0 1 12 3ZM9 14v-1H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-4v1a3 3 0 1 1-6 0Zm8 2a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2H17Z" clip-rule="evenodd"/>
                           </svg>
                           Generate Report
                     </button>
                     </div>

                  </div>
                  <form id="reports-form" class="space-y-4">
                     <div class="grid gap-4 mb-6 md:grid-cols-3">
                        <div>
                              <select id="section" name="section" class="w-full px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
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
                        <div class="flex items-center col-span-2">
                              <div class="flex-1">
                                 <input id="quarter_start" name="quarter_start" type="date" class="w-full px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2" placeholder="Select quarter start date">
                              </div>
                              <span class="mx-4 text-gray-500">to</span>
                              <div class="flex-1">
                                 <input id="quarter_end" name="quarter_end" type="date" class="w-full px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2" placeholder="Select quarter end date">
                              </div>
                        </div>
                     </div>
                  </form>
               </div>

            </div>
        </div>
    </div>
</x-app-layout>
