<x-app-layout>
   <div class="min-h-screen flex flex-col sm:ml-64">
      <div class="flex-grow p-6">
         
         <!-- Cards Container -->
         <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-6">
            <!-- Total Present Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-green-100 p-3 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5.365V3m0 2.365a5.338 5.338 0 0 1 5.133 5.368v1.8c0 2.386 1.867 2.982 1.867 4.175 0 .593 0 1.193-.538 1.193H5.538c-.538 0-.538-.6-.538-1.193 0-1.193 1.867-1.789 1.867-4.175v-1.8A5.338 5.338 0 0 1 12 5.365Zm-8.134 5.368a8.458 8.458 0 0 1 2.252-5.714m14.016 5.714a8.458 8.458 0 0 0-2.252-5.714M8.54 17.901a3.48 3.48 0 0 0 6.92 0H8.54Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Present</p>
                  <p class="text-3xl font-bold text-gray-900 dark:text-white">0</p>
               </div>
            </div>
            <!-- Total Late Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-orange-100 p-3 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 9H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h6m0-6v6m0-6 5.419-3.87A1 1 0 0 1 18 5.942v12.114a1 1 0 0 1-1.581.814L11 15m7 0a3 3 0 0 0 0-6M6 15h3v5H6v-5Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Late</p>
                  <p class="text-3xl font-bold text-gray-900 dark:text-white">0</p>
               </div>
            </div>
            <!-- Total Absent Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-violet-100 p-3 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Absent</p>
                  <p class="text-3xl font-bold text-gray-900 dark:text-white">0</p>
               </div>
            </div>
            <!-- Total Excuse Card -->
            <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-amber-100 p-3 rounded-full">
                     <svg class="w-7 h-7 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7h1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h11.5M7 14h6m-6 3h6m0-10h.5m-.5 3h.5M7 7h3v3H7V7Z"/>
                     </svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-semibold text-gray-500 dark:text-gray-400">Total Excuse</p>
                  <p class="text-3xl font-bold text-gray-900 dark:text-white">0</p>
               </div>
            </div>
         </div>
         <!-- Student Watch Position -->
         <div id="student-watch-position"></div>
      </div>
   </div> 
</x-app-layout>
