<x-app-layout>
    <div class="min-h-screen flex flex-col sm:ml-64">
        <div class="flex-grow p-4">
            <div class="p-4">
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-violet-100 p-2 rounded-full">
                              <svg class="w-7 h-7 icon-svg text-blue-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                 <path fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                              </svg>
                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Pre-Registered</p>
                           <p id="total-pre-registered" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-green-100 p-2 rounded-full">
                              <svg class="w-7 h-7 icon-svg text-green-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4.5V19a1 1 0 0 0 1 1h15M7 14l4-4 4 4 5-5m0 0h-3.207M20 9v3.207"/>
                           </svg>

                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Registered</p>
                           <p id="total-registered" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-orange-100 p-2 rounded-full">
                              <svg class="w-7 h-7 text-orange-400 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                 <path fill-rule="evenodd" d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Zm6.82-3.096a5.51 5.51 0 0 0-2.797-6.293 3.5 3.5 0 1 1 2.796 6.292ZM19.5 18h.5a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-1.1a5.503 5.503 0 0 1-.471.762A5.998 5.998 0 0 1 19.5 18ZM4 7.5a3.5 3.5 0 0 1 5.477-2.889 5.5 5.5 0 0 0-2.796 6.293A3.501 3.501 0 0 1 4 7.5ZM7.1 12H6a4 4 0 0 0-4 4 2 2 0 0 0 2 2h.5a5.998 5.998 0 0 1 3.071-5.238A5.505 5.505 0 0 1 7.1 12Z" clip-rule="evenodd"/>
                              </svg>
                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-xl font-medium text-gray-500 dark:text-gray-400">Total Teachers</p>
                           <p id="total-teachers" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>
               </div>

            </div>
        </div>
    </div>
</x-app-layout>