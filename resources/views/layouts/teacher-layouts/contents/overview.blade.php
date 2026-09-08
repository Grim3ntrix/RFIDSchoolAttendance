<x-app-layout>
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-7">
                  <div class="flex items-center justify-between border-t-4 border-violet-500 h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4 md:p-6">
                     <div class="flex items-center">
                           <div class="bg-violet-200 p-2 rounded-full border border-violet-800">
                           <svg class="w-7 h-7" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <circle cx="24" cy="12" r="8" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></circle> <path d="M42 44C42 34.0589 33.9411 26 24 26C14.0589 26 6 34.0589 6 44" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M24 44L28 39L24 26L20 39L24 44Z" fill="#2F88FF" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Students</p>
                           <p id="total-student" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between border-t-4 border-green-500 h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4 md:p-6">
                     <div class="flex items-center">
                        <div class="bg-green-200 p-2 rounded-full border border-green-800">
                           <svg class="w-7 h-7" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M630.4 13.92V32H608c-36.8 68.8-8 108.8 0 116.8h27.2V296h304v32h-22.4c-36.8 68.8-8 107.2 0 116.8H944v341.856c50.576-79.376 80-173.552 80-274.656 0-242-167.936-444.64-393.6-498.08zM385.6 905.6v-176H174.4h-3.2c-8 0-36.8-1.6-60.8-24-22.4-20.8-33.6-52.8-33.6-94.4V242.336C28.16 320.656 0 413.024 0 512c0 265.056 201.408 483.056 459.52 509.344-11.968-2.864-26.848-8.768-40.32-21.344-22.4-20.8-33.6-52.8-33.6-94.4zM475.2 294.4c-49.6 0-89.6 41.6-89.6 91.2 0-49.6 40-91.2 91.2-91.2h-1.6z" fill="#bcf0db"></path><path d="M564.8 294.4h40V180.8h-41.6v113.6zM148.8 179.2c4.8 1.6 11.2 1.6 17.6 1.6h1.6c-6.4 0-11.2 0-17.6-1.6-7.168-1.6-14.336-3.984-21.104-7.168-6.512 7.328-12.8 14.88-18.896 22.576V611.2c0 32 6.4 56 22.4 70.4 17.6 17.6 41.6 16 41.6 16h211.2v-40H148.8V179.2zM166.4 148.8h404.8c-3.2-6.4-6.4-12.8-8-20.8H344V96h214.4v-12.8H259.2v-16.368a513.696 513.696 0 0 0-106.224 80.256c4.32 1.024 8.768 1.712 13.424 1.712zM564.8 51.2c3.2-6.4 4.8-12.8 8-19.2H333.6a512.79 512.79 0 0 0-44.96 19.2H564.8zM475.2 324.8c-32 0-57.6 27.2-57.6 59.2 0 33.6 25.6 59.2 57.6 59.2H880c-3.2-6.4-6.4-12.8-8-20.8H652.8v-32h214.4v-12.8H568v-32h305.6c3.2-6.4 4.8-12.8 8-19.2v-1.6H475.2z" fill="#bcf0db"></path><path d="M771.008 953.6H872V475.2H473.6c-5.824 0-10.416-0.144-16-1.344V953.6h313.408z" fill="#9DE8F7"></path><path d="M475.2 443.2H880c-3.2-6.4-6.4-12.8-8-20.8H652.8v-32h214.4v-12.8H568v-32h305.6c3.2-6.4 4.8-12.8 8-19.2v-1.6H475.2c-32 0-57.6 27.2-57.6 59.2 0 33.6 25.6 59.2 57.6 59.2zM152.976 147.088c4.32 1.024 8.768 1.712 13.424 1.712h404.8c-3.2-6.4-6.4-12.8-8-20.8H344V96h214.4v-12.8H259.2v-32h305.6c3.2-6.4 4.8-12.8 8-19.2H166.4C136 32 108.8 57.6 108.8 89.6c0 28.72 18.768 51.44 44.176 57.488z" fill="#FFFFFF"></path><path d="M476.8 294.4h128V180.8H168c-6.4 0-11.2 0-17.6-1.6-7.168-1.6-14.336-3.984-21.104-7.168-6.832-3.2-13.264-7.216-18.896-12.032v451.2c0 32 6.4 56 22.4 70.4 17.6 17.6 41.6 16 41.6 16h211.2v-312c0-49.6 40-91.2 91.2-91.2z" fill="#FFFFFF"></path><path d="M916.8 444.8c-8-9.6-36.8-48 0-116.8h22.4v-32h-304V148.8H608c-8-8-36.8-48 0-116.8h22.4V0h-464C116.8 0 76.8 40 76.8 91.2v520c0 41.6 11.2 73.6 33.6 94.4 24 22.4 52.8 24 60.8 24H385.6v176c0 41.6 11.2 73.6 33.6 94.4 13.472 12.576 28.352 18.48 40.32 21.344 9.344 2.224 16.976 2.656 20.48 2.656h464V444.8h-27.2z m-35.2-120v1.6c-3.2 6.4-4.8 12.8-8 19.2H568v32h299.2v12.8H652.8v32H872c1.6 8 4.8 14.4 8 20.8H475.2c-32 0-57.6-25.6-57.6-59.2 0-32 25.6-59.2 57.6-59.2h406.4z m-496 332.8v40H174.4s-24 1.6-41.6-16c-16-14.4-22.4-38.4-22.4-70.4V160c5.632 4.816 12.064 8.832 18.896 12.032C136.064 175.216 143.232 177.6 150.4 179.2c6.4 1.6 11.2 1.6 17.6 1.6h436.8v113.6h-128c-51.2 0-91.2 41.6-91.2 91.2v272zM166.4 32h406.4c-3.2 6.4-4.8 12.8-8 19.2H259.2v32h299.2V96H344v32h219.2c1.6 8 4.8 14.4 8 20.8H166.4c-4.656 0-9.104-0.688-13.424-1.712C127.568 141.04 108.8 118.32 108.8 89.6 108.8 57.6 136 32 166.4 32zM912 831.424V992H481.6s-22.4 1.6-41.6-16c-16-14.4-24-38.4-24-70.4V454.4c11.2 9.6 25.6 16 40 19.2 0.576 0.144 1.04 0.128 1.6 0.256 5.584 1.2 10.176 1.344 16 1.344H912v356.224z" fill=""></path><path d="M475.2 294.4h88V180.8H166.4c-6.4 0-12.8 0-17.6-1.6v478.4h236.8v-272c0-49.6 40-91.2 89.6-91.2z" fill="#FAD97F"></path></g></svg>
                        </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Subjects</p>
                           <p id="total-subject" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between border-t-4 border-orange-500 h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4 md:p-6">
                     <div class="flex items-center">
                        <div class="bg-orange-200 p-2 rounded-full border border-orange-800">
                           <svg class="w-7 h-7" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M32 388.8h960V992H32z" fill="#FAD97F"></path><path d="M496 121.6l-100.8-60.8L496 0z" fill="#F2385A"></path><path d="M156.8 584h52.8v48H156.8zM156.8 500.8h52.8V552H156.8zM241.6 584h52.8v48h-52.8zM240 500.8h52.8V552H240z" fill="#FFFFFF"></path><path d="M124.8 468.8V664h201.6v-195.2H124.8z m168 83.2H240v-51.2h52.8V552z m-83.2 80H156.8v-48h52.8v48z m0-80H156.8v-51.2h52.8V552z m84.8 80h-52.8v-48h52.8v48z" fill=""></path><path d="M443.2 500.8H496V552h-52.8zM443.2 584H496v48h-52.8zM528 500.8h52.8V552H528zM528 584h52.8v48H528z" fill="#FFFFFF"></path><path d="M411.2 468.8V664h201.6v-195.2H411.2zM496 584v48h-52.8v-48H496z m-52.8-32v-51.2H496V552h-52.8z m84.8 80v-48h52.8v48H528z m52.8-80H528v-51.2h52.8V552z" fill=""></path><path d="M731.2 500.8H784V552h-52.8zM814.4 500.8h52.8V552h-52.8zM814.4 584h52.8v48h-52.8zM729.6 584h52.8v48h-52.8z" fill="#FFFFFF"></path><path d="M699.2 468.8V664h201.6v-195.2H699.2z m83.2 163.2h-52.8v-48h52.8v48z m1.6-80h-52.8v-51.2H784V552z m83.2 80h-52.8v-48h52.8v48z m0-80h-52.8v-51.2h52.8V552z" fill=""></path><path d="M427.2 808h169.6v184h-169.6z" fill="#FFFFFF"></path><path d="M528 356.8V0h-32v356.8H0V1024h1024V356.8H528zM596.8 992h-169.6v-184h169.6v184z m395.2 0H628.8V776H395.2v216H32V388.8h960V992z" fill=""></path></g></svg>
                        </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Sections</p>
                           <p id="total-section" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>
               </div>

               <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  <div class="w-full max-h-[500px] bg-gray-50 dark:bg-gray-800 border-t-4 border-blue-500 rounded-lg shadow-lg p-4 md:p-6">
                     <div class="flex flex-row justify-between items-center w-full">
                        <div class="flex flex-row gap-2">
                           <svg class="w-7 h-7" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M512 128C300.8 128 128 300.8 128 512s172.8 384 384 384c110.933333 0 211.2-46.933333 279.466667-121.6L512 512V128z" fill="#00BCD4"></path><path d="M896 512c0-211.2-172.8-384-384-384v384h384z" fill="#448AFF"></path><path d="M512 512l279.466667 262.4c64-68.266667 104.533333-160 104.533333-262.4H512z" fill="#3F51B5"></path></g></svg>
                           <h5 class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Today's Attendance</h5>
                        </div>
                        <div>
                           <svg data-popover-target="chart-info" data-popover-placement="bottom" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                           </svg>
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

                     <div class="pt-5">
                        <div>
                           <select id="section-piechart" class="w-58 px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
                           </select>
                        </div>
                     </div>

                     <div class="py-6" id="pie-chart-container"></div>
                  </div>

                  <div class="w-full bg-gray-50 dark:bg-gray-800 rounded-lg border-t-4 border-teal-400 shadow-lg p-4 md:p-6">
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
</x-app-layout>
