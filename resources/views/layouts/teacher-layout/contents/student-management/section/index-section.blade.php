<x-app-layout>
   <div class="min-h-screen flex flex-col sm:ml-64">
      <div class="flex-grow p-4">
         <div class="p-4">
            <div class="mb-4">
               <div class="flex items-center justify-between mb-1">
                  <x-primary-button data-modal-target="new-section-modal" data-modal-toggle="new-section-modal">
                     <svg class="w-4 h-4 text-white mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                     </svg>
                     <a href="#" class="btn btn-outline-primary hover:no-underline">{{ __('Section') }}</a>
                  </x-primary-button> 

                  <svg data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover" class="w-3.5 h-3.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                  </svg>
                  <div id="tooltip-hover" role="tooltip" class="absolute z-10 invisible px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg transform scale-95 opacity-0 transition-all duration-300 tooltip dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                     Click over the created section and add some students.
                     <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
               </div>

               <div id="new-section-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                  <div class="relative p-4 w-full max-w-2xl max-h-full">
                     <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                           <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                              Add Section
                           </h3>
                           <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="new-section-modal">
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                           </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">   
                           <form>
                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                 <div>
                                       <label for="section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                       <input type="text" id="section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Section Name" required />
                                 </div>
                                 <div>
                                       <label for="grade_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                       <input type="text" id="grade_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" required />
                                 </div>
                              </div>
                              
                              <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                           </form>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div class="flex items-center justify-between h-auto mb-4 rounded">
               <a href="{{ route('student_management_student.index') }}" class="hover:no-underline w-full">
                  <div class="w-full bg-gray-50 dark:bg-gray-800 hover:bg-emerald-500 hover:text-white dark:hover:text-white-800 active:bg-emerald-700 transition-colors duration-150 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg shadow p-4 md:p-6">
                     <div> 
                        <div class="flex justify-between items-start w-full">
                           <p class="subpixel-antialiased font-medium">{{ __('Melon') }}</p>
                           <span class="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Grade 7</span>
                        </div> 
                     </div>
                  </div>
               </a>
               <div class="ml-3">
                  <div class="flex flex-col space-y-2">
                     <!-- Edit Section Modal -->
                     <button type="button" data-modal-target="edit-subject-modal" data-modal-toggle="edit-subject-modal" class="w-15 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 font-medium rounded-md text-sm p-0.5">
                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                           <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                        </svg>
                     </button>
                     <div id="edit-subject-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-full max-w-2xl max-h-full">
                           <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                 <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit Section
                                 </h3>
                                 <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-subject-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                 </button>
                              </div>
                              <div class="p-4 md:p-5 space-y-4">   
                                 <form>
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                       <div>
                                             <label for="section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                             <input type="text" id="section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Section Name" required />
                                       </div>
                                       <div>
                                             <label for="grade_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                             <input type="text" id="grade_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" required />
                                       </div>
                                    </div>
                                    
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>

                     <!-- Delete Section Modal -->
                     <button type="button" data-modal-target="delete-section-modal" data-modal-toggle="delete-section-modal" class="w-15 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 font-medium rounded-md text-sm p-0.5">
                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                        </svg>
                     </button>
                     <div id="delete-section-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                           <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                              <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-section-modal">
                                 <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                 </svg>
                                 <span class="sr-only">Close modal</span>
                              </button>
                              <div class="p-6 text-center">
                                 <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                 </svg>
                                 <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Delete Section?</h3>
                                 <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including student records will be permanently removed. This action cannot be undone.</p>
                                 <div class="flex justify-center space-x-3">
                                    <form action="">
                                       <button type="submit" data-modal-hide="delete-section-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                          Yes, Delete
                                       </button>
                                    </form>
                                    <button data-modal-hide="delete-section-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                       No, Cancel
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div> 
                  </div>
               </div>
            </div>
            
            <div class="flex items-center justify-between h-auto mb-4 rounded">
               <a href="{{ route('student_management_student.index') }}" class="hover:no-underline w-full">
                  <div class="w-full bg-gray-50 dark:bg-gray-800 hover:bg-emerald-500 hover:text-white dark:hover:text-white-800 active:bg-emerald-700 transition-colors duration-150 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg shadow p-4 md:p-6">
                     <div> 
                        <div class="flex justify-between items-start w-full">
                           <p class="subpixel-antialiased font-medium">{{ __('Guava') }}</p>
                           <span class="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Grade 7</span>
                        </div> 
                     </div>
                  </div>
               </a>

               <div class="ml-3">
                  <div class="flex flex-col space-y-2">
                     <!-- Edit Section Modal -->
                     <button type="button" data-modal-target="edit-subject-modal" data-modal-toggle="edit-subject-modal" class="w-15 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 font-medium rounded-md text-sm p-0.5">
                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                           <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                        </svg>
                     </button>
                     <div id="edit-subject-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-full max-w-2xl max-h-full">
                           <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                 <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit Section
                                 </h3>
                                 <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-subject-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                 </button>
                              </div>
                              <div class="p-4 md:p-5 space-y-4">   
                                 <form>
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                       <div>
                                             <label for="section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                             <input type="text" id="section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Section Name" required />
                                       </div>
                                       <div>
                                             <label for="grade_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                             <input type="text" id="grade_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" required />
                                       </div>
                                    </div>
                                    
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>

                     <!-- Delete Section Modal -->
                     <button type="button" data-modal-target="delete-section-modal" data-modal-toggle="delete-section-modal" class="w-15 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 font-medium rounded-md text-sm p-0.5">
                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                        </svg>
                     </button>
                     <div id="delete-section-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                           <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                              <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-section-modal">
                                 <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                 </svg>
                                 <span class="sr-only">Close modal</span>
                              </button>
                              <div class="p-6 text-center">
                                 <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                 </svg>
                                 <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Delete Section?</h3>
                                 <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including student records will be permanently removed. This action cannot be undone.</p>
                                 <div class="flex justify-center space-x-3">
                                    <form action="">
                                       <button type="submit" data-modal-hide="delete-section-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                          Yes, Delete
                                       </button>
                                    </form>
                                    <button data-modal-hide="delete-section-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                       No, Cancel
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div> 
                  </div>
               </div>
            </div>

            <div class="flex items-center justify-between h-auto mb-4 rounded">
               <a href="{{ route('student_management_student.index') }}" class="hover:no-underline w-full">
                  <div class="w-full bg-gray-50 dark:bg-gray-800 hover:bg-emerald-500 hover:text-white dark:hover:text-white-800 active:bg-emerald-700 transition-colors duration-150 focus:outline-none focus:ring focus:ring-emerald-300 rounded-lg shadow p-4 md:p-6">
                     <div> 
                        <div class="flex justify-between items-start w-full">
                           <p class="subpixel-antialiased font-medium">{{ __('Special Science Class (CCS)') }}</p>
                           <span class="bg-purple-100 text-purple-800 text-sm font-medium px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300">Grade 7</span>
                        </div> 
                     </div>
                  </div>
               </a>

               <div class="ml-3">
                  <div class="flex flex-col space-y-2">
                     <!-- Edit Section Modal -->
                     <button type="button" data-modal-target="edit-subject-modal" data-modal-toggle="edit-subject-modal" class="w-15 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 font-medium rounded-md text-sm p-0.5">
                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-purple-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clip-rule="evenodd"/>
                           <path fill-rule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clip-rule="evenodd"/>
                        </svg>
                     </button>
                     <div id="edit-subject-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-4 w-full max-w-2xl max-h-full">
                           <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                              <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                 <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                                    Edit Section
                                 </h3>
                                 <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="edit-subject-modal">
                                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                    </svg>
                                 </button>
                              </div>
                              <div class="p-4 md:p-5 space-y-4">   
                                 <form>
                                    <div class="grid gap-6 mb-6 md:grid-cols-2">
                                       <div>
                                             <label for="section_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section Name</label>
                                             <input type="text" id="section_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Section Name" required />
                                       </div>
                                       <div>
                                             <label for="grade_level" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Grade or/ Year Level</label>
                                             <input type="text" id="grade_level" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Grade or/ Year Level" required />
                                       </div>
                                    </div>
                                    
                                    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                 </form>
                              </div>
                           </div>
                        </div>
                     </div>

                     <!-- Delete Section Modal -->
                     <button type="button" data-modal-target="delete-section-modal" data-modal-toggle="delete-section-modal" class="w-15 shadow bg-gray-50 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150 font-medium rounded-md text-sm p-0.5">
                        <svg class="w-6 h-5 text-gray-800 dark:text-white hover:text-red-500 transition-colors duration-150" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clip-rule="evenodd"/>
                        </svg>
                     </button>
                     <div id="delete-section-modal" tabindex="-1" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div class="relative p-6 w-full max-w-md max-h-full">
                           <div class="relative bg-white rounded-lg shadow-lg dark:bg-gray-700">
                              <button type="button" class="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="delete-section-modal">
                                 <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                 </svg>
                                 <span class="sr-only">Close modal</span>
                              </button>
                              <div class="p-6 text-center">
                                 <svg class="mx-auto mb-4 text-gray-500 w-12 h-12 dark:text-gray-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                                 </svg>
                                 <h3 class="mb-2 text-xl font-semibold text-gray-700 dark:text-gray-300">Delete Section?</h3>
                                 <p class="mb-5 text-sm text-gray-500 dark:text-gray-400">All data including student records will be permanently removed. This action cannot be undone.</p>
                                 <div class="flex justify-center space-x-3">
                                    <form action="">
                                       <button type="submit" data-modal-hide="delete-section-modal" class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-700 font-medium rounded-lg text-sm px-5 py-2.5">
                                          Yes, Delete
                                       </button>
                                    </form>
                                    <button data-modal-hide="delete-section-modal" type="button" class="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700">
                                       No, Cancel
                                    </button>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div> 
                  </div>
               </div>
            </div>

         </div>
      </div>
   </div> 
</x-app-layout>
