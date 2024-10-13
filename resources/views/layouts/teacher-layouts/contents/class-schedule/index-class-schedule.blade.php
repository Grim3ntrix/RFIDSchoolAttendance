<x-app-layout>
   <div class="min-h-screen flex flex-col sm:ml-64">
      <div class="flex-grow p-4">
         <div class="p-4">

            <div class="flex justify-start mb-6">
               <div id="add-class-schedule-container" class="mr-2" data-modal-target="add-class-schedule-modal" data-modal-toggle="add-class-schedule-modal">
                  <button class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                     <svg class="w-4 h-4 text-white mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                     </svg>
                     Class Schedule
                  </button>
               </div>
               <!-- <div id="select-section-container" class="mr-2">
                  <form action="">
                     <div id="import-student-container" class="mr-2">
                        <form action="#" method="POST" enctype="multipart/form-data">
                           <select id="default" class="ms-2 px-4 py-2 border border-dark rounded-md font-semibold text-xs uppercase tracking-widest focus:ring-indigo-500 disabled:opacity-2">
                              <option selected disabled>Choose a Section</option>
                              <option value="US">Melon</option>
                              <option value="CA">Guava</option>
                              <option value="FR">Special Science Class (SSC)</option>
                           </select>
                        </form>
                     </div>
                  </form>
               </div> -->
            </div>

            <!-- Add Class Schedule Modal -->
             
            <div id="add-class-schedule-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
               <div class="relative p-4 w-full max-w-2xl max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                     <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                           Add Class Schedule
                        </h3>
                        <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-class-schedule-modal">
                           <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                           </svg>
                        </button>
                     </div>
                     <div class="p-4 md:p-5 space-y-4">   
                        <form id="add-class-schedule-form">
                           <div class="grid gap-6 mb-6 md:grid-cols-2">
                              <div>
                                 <label for="subject" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject</label>
                                 <input type="text" id="subject" name="subject" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Subject" />
                              </div>
                              <div>
                                 <label for="subject_code" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Subject Code</label>
                                 <input type="text" id="subject_code" name="subject_code" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Subject Code" />
                              </div>
                           </div>
                           <div class="grid gap-6 mb-6 md:grid-cols-2">
                              <div>
                                 <label for="start_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Start time:</label>
                                 <div class="relative">
                                       <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                             <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                          </svg>
                                       </div>
                                       <input type="time" id="start_time" name="start_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="07:00" max="17:00" />
                                 </div>
                              </div>
                              <div>
                                 <label for="end_time" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">End time:</label>
                                 <div class="relative">
                                       <div class="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
                                          <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                             <path fill-rule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clip-rule="evenodd"/>
                                          </svg>
                                       </div>
                                       <input type="time" id="end_time" name="end_time" class="bg-gray-50 border leading-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" min="07:00" max="17:00" />
                                 </div>
                              </div>
                           </div>
                           <div class="grid mb-6 md:grid-cols-1">
                              <label for="days_of_weeks" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Days of Weeks</label>
                              <select multiple id="days_of_weeks" name="days_of_weeks[]" size="5" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                              </select>

                           </div>
                           <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Edit & Update Modal Container-->
            <div id="edit-class-schedule-modal-container"></div>

            <!-- Delete Modal Container-->
            <div id="delete-class-schedule-modal-container"></div>

            <div id="table-loader" class="flex justify-center items-center py-10">
               <svg role="status" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08125 50.5908C9.08125 73.5495 27.0413 91.5095 50 91.5095C72.9587 91.5095 90.9188 73.5495 90.9188 50.5908C90.9188 27.6321 72.9587 9.67209 50 9.67209C27.0413 9.67209 9.08125 27.6321 9.08125 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5536C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10248 63.2754 1.94025 56.7335 1.05189C51.7661 0.367391 46.7345 0.446447 41.8062 1.27873C39.324 1.69443 37.8557 4.19778 38.4928 6.62326C39.1299 9.04874 41.6119 10.5012 44.1076 10.1076C47.8923 9.47543 51.7426 9.52629 55.4747 10.2485C60.8569 11.2887 65.968 13.4632 70.543 16.6697C75.118 19.8763 79.0733 24.0361 82.1918 28.9444C84.7348 32.8122 86.6207 37.1317 87.7824 41.708C88.4351 44.0608 91.5422 45.6781 93.9676 45.0409Z" fill="currentFill"/>
               </svg>
               <span>Loading data, please wait...</span>
            </div>
            
            <div id="class-schedule-datatable-container"></div>

            <script>
               const sectionSlug = "{{ $section->slug }}";
            </script>
         </div>
      </div>
   </div>
</x-app-layout>
