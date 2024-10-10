<x-app-layout>
    <div class="min-h-screen flex flex-col sm:ml-64">
        <div class="flex-grow p-4">
            <div class="p-4">
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-violet-100 p-2 rounded-full">
                           <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
                           </svg>

                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                           <p id="total-student" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-green-100 p-2 rounded-full">
                           <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4"/>
                           </svg>

                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Subjects</p>
                           <p id="total-subject" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-orange-100 p-2 rounded-full">
                           <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/>
                           </svg>

                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Sections</p>
                           <p id="total-section" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>
               </div>

               <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="w-full bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
                     <div class="flex justify-between items-start w-full">
                        <div class="flex-col items-center">
                           <div class="flex items-center mb-1">
                              <h5 class="text-xl font-medium text-gray-500 dark:text-gray-400">Today's Attendance</h5>
                              <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                              </svg>
                           </div>
                           <div class="flex justify-between items-center pt-5">
                              <button class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 inline-flex items-center dark:hover:text-white">
                                 Section
                                 <svg class="w-2.5 m-2.5 ms-1.5" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 10 6">
                                    <path d="m1 1 4 4 4-4"/>
                                 </svg>
                              </button>
                           </div>

                           <div data-popover id="chart-info" role="tooltip" class="absolute z-10 invisible text-sm text-gray-500 bg-white border border-gray-200 rounded-lg shadow-lg-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                              <div class="p-3 space-y-2">
                                 <h3 class="font-semibold text-gray-900 dark:text-white">Present</h3>
                                 <p>Shows the total number of students currently present for the day.</p>
                                 <h3 class="font-semibold text-gray-900 dark:text-white">Late</h3>
                                 <p>Displays the number of students marked as late today.</p>
                                 <h3 class="font-semibold text-gray-900 dark:text-white">Absent</h3>
                                 <p>Indicates the total percentage of students absent today.</p>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div class="py-6" id="pie-chart-container"></div>
                  </div>

                  <div class="w-full bg-gray-50 dark:bg-gray-800 rounded-lg shadow-lg p-4 md:p-6">
                     <div id="table-loader" class="flex justify-center items-center py-10">
                        <svg role="status" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08125 50.5908C9.08125 73.5495 27.0413 91.5095 50 91.5095C72.9587 91.5095 90.9188 73.5495 90.9188 50.5908C90.9188 27.6321 72.9587 9.67209 50 9.67209C27.0413 9.67209 9.08125 27.6321 9.08125 50.5908Z" fill="currentColor"/>
                           <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5536C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10248 63.2754 1.94025 56.7335 1.05189C51.7661 0.367391 46.7345 0.446447 41.8062 1.27873C39.324 1.69443 37.8557 4.19778 38.4928 6.62326C39.1299 9.04874 41.6119 10.5012 44.1076 10.1076C47.8923 9.47543 51.7426 9.52629 55.4747 10.2485C60.8569 11.2887 65.968 13.4632 70.543 16.6697C75.118 19.8763 79.0733 24.0361 82.1918 28.9444C84.7348 32.8122 86.6207 37.1317 87.7824 41.708C88.4351 44.0608 91.5422 45.6781 93.9676 45.0409Z" fill="currentFill"/>
                        </svg>
                        <span>Loading data, please wait...</span>
                     </div>

                     <div id="ongoing-class-schedules"></div>
                  </div>
               </div>
            </div>
        </div>
    </div>
</x-app-layout>