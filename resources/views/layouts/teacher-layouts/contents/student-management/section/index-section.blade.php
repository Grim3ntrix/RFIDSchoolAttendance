<x-app-layout>
            <div class="mb-4">
               <div class="flex items-center justify-between mb-1">
                  <div id="add-section-container" class="mr-2" data-modal-target="add-section-modal" data-modal-toggle="add-section-modal">
                     <button class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        <svg class="w-4 h-4 text-white mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                        </svg>
                        Add
                     </button>
                  </div>
                  </div>
               </div>

               <!-- Add Modal -->

               <div id="add-section-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative p-4 w-full max-w-2xl max-h-full">
                     <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                           <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                              Add Section
                           </h3>
                           <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-section-modal">
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                           </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">   
                           <form id="add-section-form" method="POST" >
                              @csrf
                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                 <div>
                                       <label for="section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                       <input type="text" name="section_name" id="section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Section Name" />
                                 </div>
                                 <div>
                                       <label for="grade_or_year_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                       <input type="text" name="grade_or_year_level" id="grade_or_year_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" />
                                 </div>
                              </div>
                              
                              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>


               <!-- Edit & Update Modal Container-->
               <div id="edit-section-modal-container"></div>

               <!-- Delete Modal Container-->
               <div id="delete-section-modal-container"></div>

               <div class="rounded-lg bg-teal-100 dark:bg-gray-700 border border-gray-300 shadow-lg p-6 md:p-8 mt-8" id="toggle-daily-attendance-content">
                  <div class="flex justify-between items-center mb-3">
                     <div class="flex flex-row">
                        <svg class="w-7 h-7 mr-2" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M886.8 377.4c-5.3-8.9-18-16.1-28.3-16.1H167.7c-10.3 0-23 7.2-28.3 16.1l-54 90.7c-5.3 8.9-1.2 16.1 9.1 16.1h837.1c10.3 0 14.4-7.2 9.1-16.1l-53.9-90.7z" fill="#00B3E3"></path><path d="M900.9 401.2H576.1v28.6H918l-17.1-28.6z m-792.7 28.6h338.1v-28.6h-321l-17.1 28.6z" fill=""></path><path d="M608.5 479.6l-97.3-156.2-97.4 156.2H87.1v378h848.1v-378z" fill="#D1D3D3"></path><path d="M638.9 499.9c-7.1 0-15.9-4.9-19.7-10.9l-5.9-9.4h-4.9L517.7 334c-4.3-2-8.9-2-13.3 0l-90.7 145.6H409l-5.9 9.4c-3.8 6-12.6 10.9-19.7 10.9H87.1v50.2h312.2c7.1 0 15.8-5 19.3-11.1l76.2-116.7c8.9-15.2 23.6-15.2 32.5 0L603.5 539c3.6 6.1 12.2 11.1 19.3 11.1H935v-50.2H638.9z" fill=""></path><path d="M852.8 559.2h82.4v39.6h-82.4zM605.8 641.2h82.4v39.6h-82.4zM754.9 781.9h82.4v39.6h-82.4zM327.4 792.5h82.4v39.6h-82.4zM87.1 597.2h82.4v39.6H87.1zM286.2 515.2h82.4v39.6h-82.4z" fill="#A4A9AD"></path><path d="M440.4 663h141.5v194.6H440.4z" fill="#333E48"></path><path d="M467.4 708H496v53.9h-28.6zM526.3 708h28.6v53.9h-28.6zM292.5 630.2h83.2v114.4h-83.2z" fill="#FFFFFF"></path><path d="M292.5 630.2h83.2v25.2h-83.2z" fill=""></path><path d="M292.5 673.1h83.2v28.6h-83.2z" fill="#A93439"></path><path d="M306.8 730.3h54.6v-85.8h-54.6v85.8z m68.9 28.6h-83.2c-7.9 0-14.3-6.4-14.3-14.3V630.2c0-7.9 6.4-14.3 14.3-14.3h83.2c7.9 0 14.3 6.4 14.3 14.3v114.4c0 7.9-6.4 14.3-14.3 14.3z" fill="#FF5959"></path><path d="M131.1 630.2h83.2v114.4h-83.2z" fill="#FFFFFF"></path><path d="M131.1 630.2h83.2v25.2h-83.2z" fill=""></path><path d="M131.1 673.1h83.2v28.6h-83.2z" fill="#A93439"></path><path d="M145.4 730.3H200v-85.8h-54.6v85.8z m68.9 28.6h-83.2c-7.9 0-14.3-6.4-14.3-14.3V630.2c0-7.9 6.4-14.3 14.3-14.3h83.2c7.9 0 14.3 6.4 14.3 14.3v114.4c0 7.9-6.4 14.3-14.3 14.3z" fill="#FF5959"></path><path d="M646.7 630.2h83.2v114.4h-83.2z" fill="#FFFFFF"></path><path d="M646.7 630.2h83.2v25.2h-83.2z" fill=""></path><path d="M646.7 673.1h83.2v28.6h-83.2z" fill="#A93439"></path><path d="M661 730.3h54.6v-85.8H661v85.8z m68.8 28.6h-83.2c-7.9 0-14.3-6.4-14.3-14.3V630.2c0-7.9 6.4-14.3 14.3-14.3h83.2c7.9 0 14.3 6.4 14.3 14.3v114.4c0 7.9-6.4 14.3-14.3 14.3z" fill="#FF5959"></path><path d="M808 630.2h83.2v114.4H808z" fill="#FFFFFF"></path><path d="M808 630.2h83.2v25.2H808z" fill=""></path><path d="M808 673.1h83.2v28.6H808z" fill="#A93439"></path><path d="M822.3 730.3h54.6v-85.8h-54.6v85.8z m68.9 28.6H808c-7.9 0-14.3-6.4-14.3-14.3V630.2c0-7.9 6.4-14.3 14.3-14.3h83.2c7.9 0 14.3 6.4 14.3 14.3v114.4c0 7.9-6.4 14.3-14.3 14.3z" fill="#FF5959"></path><path d="M511.2 152.5h165.1v94.6H511.2z" fill="#FFB819"></path><path d="M511.2 152.5h43.2v94.6h-43.2z" fill=""></path><path d="M511.2 337.7c-7.9 0-14.3-6.4-14.3-14.3v-184c0-7.9 6.4-14.3 14.3-14.3s14.3 6.4 14.3 14.3v184.1c0 7.8-6.4 14.2-14.3 14.2z" fill="#333E48"></path><path d="M528.2 308.8c-9.4-15-24.7-15-34.1 0l-91 145.2c-3.8 6-12.6 10.9-19.7 10.9H79.3c-7.1 0-12.9 5.8-12.9 12.9v24.5c0 7.1 5.8 12.9 12.9 12.9h320.1c7.1 0 15.8-5 19.3-11.1l76.2-116.7c8.9-15.2 23.6-15.2 32.5 0l76.2 116.7c3.6 6.1 12.2 11.1 19.3 11.1h320c7.1 0 12.9-5.8 12.9-12.9v-24.5c0-7.1-5.8-12.9-12.9-12.9h-304c-7.1 0-15.9-4.9-19.7-10.9l-91-145.2z" fill="#0071CE"></path><path d="M511.2 559.2m-64.9 0a64.9 64.9 0 1 0 129.8 0 64.9 64.9 0 1 0-129.8 0Z" fill="#FFFFFF"></path><path d="M536 544.9h-10.6v-10.6c0-7.9-6.4-14.3-14.3-14.3s-14.3 6.4-14.3 14.3v24.9c0 7.9 6.4 14.3 14.3 14.3H536c7.9 0 14.3-6.4 14.3-14.3s-6.4-14.3-14.3-14.3z" fill="#333E48"></path><path d="M959.7 892.9c0 4.2-3.5 7.7-7.7 7.7H74.2c-4.2 0-7.7-3.5-7.7-7.7v-27.6c0-4.2 3.5-7.7 7.7-7.7H952c4.2 0 7.7 3.5 7.7 7.7v27.6z" fill="#00AD68"></path><path d="M397.8 857.6h230.6v43H397.8z" fill="#A4A9AD"></path><path d="M914.8 857.6c0-36-29.2-65.2-65.2-65.2s-65.2 29.2-65.2 65.2h130.4zM279.4 857.6c0-36-29.2-65.2-65.2-65.2S149 821.6 149 857.6h130.4z" fill="#218649"></path></g></svg>
                        <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Section</h3>
                     </div>
                     <div>
                        <div class="mb-6">
                           <div>
                              <svg data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover" class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                              </svg>
                              <div id="tooltip-hover" role="tooltip" class="absolute z-10 invisible px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg transform scale-95 opacity-0 transition-all duration-300 tooltip dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                                 Manage students and class schedules in the section.
                                 <div class="tooltip-arrow" data-popper-arrow></div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
                  <p class="text-gray-700 dark:text-gray-300 mt-2 md:mt-0"> Manage your sections, including updates to students and class schedules for each section.</p>

                  <div id="sections-container">
                     <!-- Table content goes here -->
                  </div>
               </div>
</x-app-layout>
