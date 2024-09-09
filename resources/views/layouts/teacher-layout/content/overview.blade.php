<x-app-layout>
    <div class="min-h-screen flex flex-col sm:ml-64">
        <div class="flex-grow p-4">
            <div class="p-4">           
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-violet-100 p-2 rounded-full">
                           <svg class="w-10 h-10 icon-svg text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="M4.5 17H4a1 1 0 0 1-1-1 3 3 0 0 1 3-3h1m0-3.05A2.5 2.5 0 1 1 9 5.5M19.5 17h.5a1 1 0 0 0 1-1 3 3 0 0 0-3-3h-1m0-3.05a2.5 2.5 0 1 0-2-4.45m.5 13.5h-7a1 1 0 0 1-1-1 3 3 0 0 1 3-3h3a3 3 0 0 1 3 3 1 1 0 0 1-1 1Zm-1-9.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"/>
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
                              <svg class="w-10 h-10 icon-svg text-green-500 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.03v13m0-13c-2.819-.831-4.715-1.076-8.029-1.023A.99.99 0 0 0 3 6v11c0 .563.466 1.014 1.03 1.007 3.122-.043 5.018.212 7.97 1.023m0-13c2.819-.831 4.715-1.076 8.029-1.023A.99.99 0 0 1 21 6v11c0 .563-.466 1.014-1.03 1.007-3.122-.043-5.018.212-7.97 1.023"/>
                              </svg>
                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-400 dark:text-gray-400">Total Subjects</p>
                           <p class="text-2xl font-bold text-gray-900 dark:text-white">56</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow p-4">
                     <div class="flex items-center">
                           <div class="bg-orange-100 p-2 rounded-full">
                           <svg class="w-10 h-10 icon-svg text-orange-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M6 4h12M6 4v16M6 4H5m13 0v16m0-16h1m-1 16H6m12 0h1M6 20H5M9 7h1v1H9V7Zm5 0h1v1h-1V7Zm-5 4h1v1H9v-1Zm5 0h1v1h-1v-1Zm-3 4h2a1 1 0 0 1 1 1v4h-4v-4a1 1 0 0 1 1-1Z"/>
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
