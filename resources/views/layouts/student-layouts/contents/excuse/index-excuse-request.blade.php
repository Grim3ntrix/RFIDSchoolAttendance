<x-app-layout>
   <div class="min-h-screen flex flex-col sm:ml-64">
      <div class="flex-grow p-4">
         <div class="p-4 space-y-8">
            <div class="bg-green-100 border border-green-300 rounded-lg p-6 shadow-lg">
               <h2 class="font-semibold text-lg text-green-900 mb-3 flex items-center"> 
                  <svg class="w-6 h-6 mr-2 text-green-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                     <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m10.827 5.465-.435-2.324m.435 2.324a5.338 5.338 0 0 1 6.033 4.333l.331 1.769c.44 2.345 2.383 2.588 2.6 3.761.11.586.22 1.171-.31 1.271l-12.7 2.377c-.529.099-.639-.488-.749-1.074C5.813 16.73 7.538 15.8 7.1 13.455c-.219-1.169.218 1.162-.33-1.769a5.338 5.338 0 0 1 4.058-6.221Zm-7.046 4.41c.143-1.877.822-3.461 2.086-4.856m2.646 13.633a3.472 3.472 0 0 0 6.728-.777l.09-.5-6.818 1.277Z"/>
                  </svg>
                  Important Notice
               </h2>
               <p class="text-green-700">
                  Your excuse request will be reviewed by the teacher responsible for the selected class schedule. Please be patient while awaiting a decision, and feel free to start composing your request in the meantime.
               </p>
            </div>

            <!-- Compose Button -->
             
            <div class="flex justify-between mb-6">
               <div id="class-schedule-container" class="mr-2" data-modal-target="compose-excuse-request-modal" data-modal-toggle="compose-excuse-request-modal">
                  <button class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                     <svg class="w-4 h-4 text-white mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                     </svg>
                     Compose
                  </button>
               </div>
               <div class="flex items-center justify-center">
                  <svg data-tooltip-target="tooltip-hover" data-tooltip-trigger="hover" class="w-4 h-4 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                     <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm0 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm1-5.034V12a1 1 0 0 1-2 0v-1.418a1 1 0 0 1 1.038-.999 1.436 1.436 0 0 0 1.488-1.441 1.501 1.501 0 1 0-3-.116.986.986 0 0 1-1.037.961 1 1 0 0 1-.96-1.037A3.5 3.5 0 1 1 11 11.466Z"/>
                  </svg>
                  <div id="tooltip-hover" role="tooltip" class="absolute z-10 invisible px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-lg shadow-lg transform scale-95 opacity-0 transition-all duration-300 tooltip dark:bg-gradient-to-r dark:from-gray-800 dark:via-gray-700 dark:to-gray-800">
                     The recipient's details are missing, but they can still view your request.
                     <div class="tooltip-arrow" data-popper-arrow></div>
                  </div>
               </div>
            </div>

            <!-- Add Class Schedule Modal -->
             
            <div id="compose-excuse-request-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
               <div class="relative p-4 w-full max-w-2xl max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <!-- Modal Header -->
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                           <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                              New Excuse Request
                           </h3>
                           <span></span>
                           <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="compose-excuse-request-modal">
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                           </button>
                        </div>

                        <!-- Modal Body -->
                        <div class="p-4 md:p-5 space-y-4">
                           <form id="excuse-request-form">
                              <!-- Section and Class Schedule -->
                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                       <label for="section" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Section (auto filled)</label>
                                       <div class="relative">
                                          <input type="text" id="section" name="section" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Selected Section" />
                                       </div>
                                    </div>
                                    <div>
                                       <label for="class_schedule" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Class Schedule</label>
                                       <select id="class_schedule" name="class_schedule" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                       </select>
                                    </div>
                              </div>

                              <!-- Recipient and Proof Link -->
                              <div class="grid gap-6 mb-6 md:grid-cols-2">
                                    <div>
                                       <label for="recipient" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Recipient (auto filled)</label>
                                       <div class="relative">
                                          <input type="text" id="recipient" name="recipient" disabled class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="To whom you're sending the request" />
                                       </div>
                                    </div>
                                    <div>
                                       <label for="proof_link" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Proof (document link)</label>
                                       <input type="text" id="proof_link" name="proof_link" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Paste the link to your proof document" />
                                    </div>
                              </div>

                              <!-- Excuse Message -->
                              <div class="grid mb-6 md:grid-cols-1">
                                    <label for="excuse_message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Excuse Message</label>
                                    <textarea id="excuse_message" name="excuse_message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Explain your reason for absence..."></textarea>
                              </div>

                              <!-- Submit Button --> 
                              <button type="submit" class="flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                 Submit Request
                                 <svg class="w-4 h-4 text-gray-100 dark:text-white rotate-90" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fill-rule="evenodd" d="M12 2a1 1 0 0 1 .932.638l7 18a1 1 0 0 1-1.326 1.281L13 19.517V13a1 1 0 1 0-2 0v6.517l-5.606 2.402a1 1 0 0 1-1.326-1.281l7-18A1 1 0 0 1 12 2Z" clip-rule="evenodd"/>
                                 </svg>
                              </button>
                           </form>
                        </div>
                  </div>
               </div>
            </div>

            <!-- Edit & Update Modal Container-->
            <div id="excuse-request-message-modal-container"></div>

            <!-- Delete Modal Container-->
            <div id="delete-excuse-request-message-modal-container"></div>

            <div id="table-loader" class="flex justify-center items-center py-10">
               <svg role="status" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08125 50.5908C9.08125 73.5495 27.0413 91.5095 50 91.5095C72.9587 91.5095 90.9188 73.5495 90.9188 50.5908C90.9188 27.6321 72.9587 9.67209 50 9.67209C27.0413 9.67209 9.08125 27.6321 9.08125 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5536C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10248 63.2754 1.94025 56.7335 1.05189C51.7661 0.367391 46.7345 0.446447 41.8062 1.27873C39.324 1.69443 37.8557 4.19778 38.4928 6.62326C39.1299 9.04874 41.6119 10.5012 44.1076 10.1076C47.8923 9.47543 51.7426 9.52629 55.4747 10.2485C60.8569 11.2887 65.968 13.4632 70.543 16.6697C75.118 19.8763 79.0733 24.0361 82.1918 28.9444C84.7348 32.8122 86.6207 37.1317 87.7824 41.708C88.4351 44.0608 91.5422 45.6781 93.9676 45.0409Z" fill="currentFill"/>
               </svg>
               <span>Loading data, please wait...</span>
            </div>

            <div id="student-excuse-request-container"></div>
         </div>
      </div>
   </div> 
</x-app-layout>
