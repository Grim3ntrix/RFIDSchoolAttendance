<x-app-layout>
   <div class="min-h-screen flex flex-col sm:ml-64">
      <div class="flex-grow p-6">
         <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-4 relative">
            <!-- Section Name -->
            <div class="col-span-1 flex justify-between items-center">
               <p class="text-sm md:text-md lg:text-lg font-semibold text-gray-700">
                  My Section:
                  <span id="section-name" class="ml-2 text-sm md:text-md lg:text-lg font-inter text-green-600">- - -</span>
               </p>

               <!-- Tooltip for Small Screens -->
               <div class="relative md:hidden">
                  <div class="flex justify-end">
                        <svg id="small-tooltip-trigger" data-tooltip-target="tooltip-hover-sm" data-tooltip-trigger="hover" class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                        </svg>
                        <div id="tooltip-hover-sm" role="tooltip" class="absolute z-10 invisible px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg transform scale-95 opacity-0 transition-all duration-300 tooltip dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                           Data will be automatically provided only after filling all three selections.
                        <div class="tooltip-arrow" data-popper-arrow></div>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Class Schedule Dropdown -->
            <div class="col-span-1 flex justify-center md:justify-start">
               <select id="class-schedule-student-overview" class="w-full md:w-64 px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
               </select>
            </div>

            <!-- Date Range Inputs -->
            <div class="col-span-1 flex items-center justify-start md:justify-end space-x-2 md:space-x-4 relative">
               <!-- Start Date -->
               <div class="w-full md:w-auto">
                  <input id="start-date" type="date" class="w-full md:w-40 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2" placeholder="Select a start date">
               </div>

               <!-- Separator "to" for medium and larger screens -->
               <span class="text-gray-500 hidden md:inline-block">to</span>

               <!-- End Date -->
               <div class="w-full md:w-auto">
                  <input id="end-date" type="date" class="w-full md:w-40 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2" placeholder="Select an end date">
               </div>

               <!-- Tooltip for Medium and Large Screens -->
               <div class="relative hidden md:block">
                     <div class="flex justify-end">
                        <svg id="small-tooltip-trigger" data-tooltip-target="tooltip-hover-md" data-tooltip-trigger="hover" class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                           <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                        </svg>
                        <div id="tooltip-hover-md" role="tooltip" class="absolute z-10 invisible px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg transform scale-95 opacity-0 transition-all duration-300 tooltip dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                           Data will be automatically provided only after filling all three selections.
                        <div class="tooltip-arrow" data-popper-arrow></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>

         <!-- Cards Container -->
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            <!-- Total Present Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-blue-200 p-2 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Present</p>
                  <p id="total-present" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
            <!-- Total Late Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-red-200 p-2 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Late</p>
                  <p id="total-late" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
            <!-- Total Absent Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-gray-200 p-2 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Absent</p>
                  <p id="total-absent" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
            <!-- Total Excuse Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-yellow-200 p-2 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Excuse</p>
                  <p id="total-excuse" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
         </div>
         <!-- Student Watch Position -->
         <div id="student-watch-position"></div>
      </div>
   </div> 
</x-app-layout>
