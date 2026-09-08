<x-app-layout>
            
               <div id="reports-container" class="relative rounded-lg bg-teal-100 dark:bg-gray-700 border border-gray-300 shadow-lg p-6 md:p-8">
                  <div class="flex flex-col gap-2 sm:flex-row items-start sm:items-center justify-between border-b border-green-300 pb-4 mb-4">
                     <div class="flex flex-row">
                        <svg class="w-7 h-7 mr-2" viewBox="0 -5.4 85.375 85.375" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="chart_graphic" data-name="chart graphic" transform="translate(-1263.801 -241.35)"> <path id="Path_181" data-name="Path 181" d="M1329.493,251.1l-22.3,22.3-1.167-1.17.024-.023-9.965-9.973L1263.8,294.521l9.966,9.971,22.294-22.3,1.171,1.17-.025.023,9.971,9.968,32.279-32.286Z" fill="#a4d322"></path> <path id="Path_182" data-name="Path 182" d="M1349.153,241.35l.022,29.427-29.389-29.387Z" fill="#a4d322"></path> <path id="Path_183" data-name="Path 183" d="M1333.026,267.5l6.43-6.435-9.963-9.968-1.533,1.533Z" fill="#739142"></path> <path id="Path_184" data-name="Path 184" d="M1339.464,265.172l-9.815,9.808v40.936h14.529V269.888Z" fill="#27b7ff"></path> <path id="Path_185" data-name="Path 185" d="M1311.012,315.917h14.522V279.1l-14.522,14.524Z" fill="#27b7ff"></path> <path id="Path_186" data-name="Path 186" d="M1296.043,286.33,1292.372,290v25.919H1306.9V297.183l-1.782-1.779Z" fill="#27b7ff"></path> <path id="Path_187" data-name="Path 187" d="M1273.767,308.6l-.033-.041v7.356h14.521V294.109l-12.433,12.43Z" fill="#27b7ff"></path> </g> </g></svg>
                        <h3 class="text-xl font-medium text-gray-900 dark:text-white">Quarterly Attendance Report</h3>
                     </div>
              
                     <div>
                        <button id="generate-report-btn" class="inline-flex items-center px-4 py-2 bg-white border border-gray-400 rounded-md font-semibold text-xs text-dark hover:text-white dark:text-gray-800 uppercase tracking-widest hover:bg-teal-700 dark:hover:bg-white focus:bg-teal-100 dark:focus:bg-white active:bg-teal-900 dark:active:bg-teal-300 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:ring-offset-1 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
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

</x-app-layout>
