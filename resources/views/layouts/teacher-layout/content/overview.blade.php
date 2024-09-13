<x-app-layout>
    <div class="min-h-screen flex flex-col sm:ml-64">
        <div class="flex-grow p-4">
            <div class="p-4">           
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-violet-100 p-2 rounded-full">
                              <svg class="w-10 h-10 icon-svg text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                 <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"/>
                              </svg>

                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Students</p>
                           <p class="text-2xl font-bold text-gray-900 dark:text-white">25</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-green-100 p-2 rounded-full">
                              <svg class="w-10 h-10 icon-svg text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                 <path fill-rule="evenodd" d="M6 2a2 2 0 0 0-2 2v15a3 3 0 0 0 3 3h12a1 1 0 1 0 0-2h-2v-2h2a1 1 0 0 0 1-1V4a2 2 0 0 0-2-2h-8v16h5v2H7a1 1 0 1 1 0-2h1V2H6Z" clip-rule="evenodd"/>
                              </svg>

                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Subjects</p>
                           <p class="text-2xl font-bold text-gray-900 dark:text-white">56</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-orange-100 p-2 rounded-full">
                              <svg class="w-10 h-10 icon-svg text-orange-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                 <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd"/>
                              </svg>

                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Sections</p>
                           <p class="text-2xl font-bold text-gray-900 dark:text-white">30</p>
                     </div>
                  </div>
               </div>

               <div class="flex items-center justify-center h-auto mb-4 rounded bg-gray-50 dark:bg-gray-800">
                  <div class="max-w-full w-full bg-gray-50 dark:bg-gray-800 rounded-lg shadow p-4 md:p-6">
                     <div>
                           <div class="flex justify-between items-start w-full">
                              <div class="flex-col items-center">
                                 <div class="flex items-center mb-1">
                                    <h5 class="text-xl font-medium text-gray-500 dark:text-gray-400">Attendance Today</h5>
                                    <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                       <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                                    </svg>
                                    <div data-popover id="chart-info" role="tooltip" class="absolute z-10 invisible inline-block text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-0 w-72 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400">
                                       <div class="p-3 space-y-2">
                                                <h3 class="font-semibold text-gray-900 dark:text-white">Present</h3>
                                                <p>Shows the total number of students currently present for the day.</p>
                                                
                                                <h3 class="font-semibold text-gray-900 dark:text-white">Late</h3>
                                                <p>Displays the number of students marked as late today.</p>

                                                <h3 class="font-semibold text-gray-900 dark:text-white">Absent</h3>
                                                <p>Indicates the total persentage of students who are absent today.</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div class="flex justify-between items-center pt-5">
                                 <!-- Button -->
                                 <button
                                 id="dropdownDefaultButton"
                                 data-dropdown-toggle="lastDaysdropdown"
                                 data-dropdown-placement="bottom"
                                 class="text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white"
                                 type="button">
                                 Section
                                 <svg class="w-2.5 m-2.5 ms-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 4 4 4-4"/>
                                 </svg>
                                 </button>
                                 <div id="lastDaysdropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                                       <li>
                                          <a href="#" class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Section 1</a>
                                       </li>
                                    </ul>
                                 </div>
                              </div>
                           </div>
                        </div>
                     <div class="py-6" id="pie-chart">
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div> 
</x-app-layout>
