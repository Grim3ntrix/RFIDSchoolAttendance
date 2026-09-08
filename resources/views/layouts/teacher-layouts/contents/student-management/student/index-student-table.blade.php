<x-app-layout>

            <div class="flex justify-start mb-4">
               <div id="add-student-container" class="mr-2" data-modal-target="add-student-modal" data-modal-toggle="add-student-modal">
                  <button class="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-white dark:text-gray-800 uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-white focus:bg-gray-700 dark:focus:bg-white active:bg-gray-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                     <svg class="w-4 h-4 text-white mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 7.757v8.486M7.757 12h8.486M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                     </svg>
                        Add
                  </button>
               </div> 

               <!-- <div id="importCSV-student-container" class="mr-2">
                  <form action="#" method="" enctype="multipart/form-data">
                  <form>
                     <button type="submit" class="inline-flex items-center ms-2 px-4 py-2 bg-white border border-gray-400 rounded-md font-semibold text-xs text-dark hover:text-white dark:text-gray-800 uppercase tracking-widest hover:bg-green-700 dark:hover:bg-white focus:bg-green-700 dark:focus:bg-white active:bg-green-900 dark:active:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150">
                        <svg class="w-4 h-4 text-dark mr-2 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path fill-rule="evenodd" d="M9 2.221V7H4.221a2 2 0 0 1 .365-.5L8.5 2.586A2 2 0 0 1 9 2.22ZM11 2v5a2 2 0 0 1-2 2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2 2 2 0 0 0 2 2h12a2 2 0 0 0 2-2 2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2V4a2 2 0 0 0-2-2h-7Zm1.018 8.828a2.34 2.34 0 0 0-2.373 2.13v.008a2.32 2.32 0 0 0 2.06 2.497l.535.059a.993.993 0 0 0 .136.006.272.272 0 0 1 .263.367l-.008.02a.377.377 0 0 1-.018.044.49.49 0 0 1-.078.02 1.689 1.689 0 0 1-.297.021h-1.13a1 1 0 1 0 0 2h1.13c.417 0 .892-.05 1.324-.279.47-.248.78-.648.953-1.134a2.272 2.272 0 0 0-2.115-3.06l-.478-.052a.32.32 0 0 1-.285-.341.34.34 0 0 1 .344-.306l.94.02a1 1 0 1 0 .043-2l-.943-.02h-.003Zm7.933 1.482a1 1 0 1 0-1.902-.62l-.57 1.747-.522-1.726a1 1 0 0 0-1.914.578l1.443 4.773a1 1 0 0 0 1.908.021l1.557-4.773Zm-13.762.88a.647.647 0 0 1 .458-.19h1.018a1 1 0 1 0 0-2H6.647A2.647 2.647 0 0 0 4 13.647v1.706A2.647 2.647 0 0 0 6.647 18h1.018a1 1 0 1 0 0-2H6.647A.647.647 0 0 1 6 15.353v-1.706c0-.172.068-.336.19-.457Z" clip-rule="evenodd"/>
                        </svg>
                        <input type="file" name="file" accept=".csv" class="hidden">
                        Import
                     </button>
                  </form>
               </div> -->
            </div>

            <!-- Add Student Modal -->

            <div id="add-student-modal" tabindex="-1" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
               <div class="relative w-full max-w-4xl max-h-full">
                  <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                           <h3 class="text-xl font-medium text-gray-900 dark:text-white">
                              Add Student
                           </h3>
                           <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="add-student-modal">
                              <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                              </svg>
                              <span class="sr-only">Close modal</span>
                           </button>
                        </div>
                        <div class="p-4 md:p-5 space-y-4">
                        <form method="POST" id="add-student-form">
                           @csrf
                           <div class="grid gap-6 mb-6 md:grid-cols-4">
                              <div>
                                 <label for="school_id" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">School Id</label>
                                 <input type="text" id="school_id" name="school_id" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter School ID" />
                              </div>
                              <div>
                                 <label for="rfid_serial_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">RFID Serial Number</label>
                                 <input type="number" id="rfid_serial_number" name="rfid_serial_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="0000000000" />
                              </div>
                              <div>
                                 <label for="batch" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Batch</label>
                                 <input type="text" id="batch" name="batch" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter Batch" />
                              </div>
                              <div>
                                 <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                 <input type="email" id="email" name="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter Email" />
                              </div>
                           </div>
                           <div class="grid gap-6 mb-6 md:grid-cols-4">
                              <div>
                                 <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First Name</label>
                                 <input type="text" id="first_name" name="first_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter First Name" />
                              </div>
                              <div>
                                 <label for="middle_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Middle Name</label>
                                 <input type="text" id="middle_name" name="middle_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter Middle Name" />
                              </div>

                              <div>
                                 <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last Name</label>
                                 <input type="text" id="last_name" name="last_name" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter Last Name" />
                              </div>
                              <div>
                                 <label for="name_extension" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name Extension</label>
                                 <select id="name_extension" name="name_extension" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected disabled>Open melect menu</option>
                                    <option value="">None</option>
                                    <option value="Jr.">Jr.</option>
                                    <option value="Sr.">Sr.</option>
                                    <option value="II">II</option>
                                    <option value="III">III</option>
                                    <option value="IV">IV</option>
                                 </select>
                              </div>
                           </div>
                           <div class="grid gap-6 mb-6 md:grid-cols-3">
           
                              <div>
                                 <label for="sex" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sex</label>
                                 <select id="sex" name="sex" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected disabled>Open melect menu</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                 </select>
                              </div>

                              <div>
                                 <label for="birth_date" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Birthdate</label>
                                 <input type="date" id="birth_date" name="birth_date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />

                              </div>
                              <div>
                                 <label for="phone_number" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Phone Number</label>
                                 <input type="number" id="phone_number" name="phone_number" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter Phone Number" />

                              </div>
                            </div>
                            <div class="grid gap-6 mb-6 md:grid-cols-1">
                              <div>
                                 <label for="address" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Address</label>
                                 <input type="text" id="address" name="address" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" autocomplete="off" placeholder="Enter Address" />
                              </div>
                           </div>

                           <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>

            <!-- Edit & Update Modal Container-->
            <div id="edit-student-modal-container"></div>

            <!-- Delete Modal Container-->
            <div id="delete-student-modal-container"></div>

            <div class="rounded-lg bg-teal-100 dark:bg-gray-700 border border-gray-300 shadow-lg p-6 md:p-8 mt-8" id="toggle-daily-attendance-content">
               <div class="flex items-center mb-3">
               <svg class="w-9 h-9 mr-1" viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M693.504 204.8C720.5376 204.8 742.4 225.9712 742.4 252.0576V358.4h-51.2v-102.4H256v512h179.2v51.2H253.696C226.6624 819.2 204.8 798.0288 204.8 771.9424V252.0576C204.8 225.9456 226.688 204.8 253.696 204.8z" fill="#ED892D"></path><path d="M204.8 307.2h537.6v51.2H204.8z" fill="#EF8919"></path><path d="M460.8 409.6h-153.6v128h153.6v-128z m-51.2 51.2v25.6h-51.2v-25.6h51.2zM486.4 614.4h-128v51.2h98.0992a254.08 254.08 0 0 0-16.1792 51.1744L307.2 716.8v-153.6l230.4256-0.0512A257.5104 257.5104 0 0 0 486.4 614.4z" fill="#F6C37B"></path><path d="M652.8 409.6a115.2 115.2 0 1 0 0 230.4 115.2 115.2 0 0 0 0-230.4z m0 51.2a64 64 0 1 1 0 128 64 64 0 0 1 0-128z" fill="#C043DE"></path><path d="M658.9184 589.6704a25.6 25.6 0 1 1 4.5312 50.9952 166.5536 166.5536 0 0 0-144.4352 117.7088l-1.8432 6.6816 15.5136 0.768 11.6992 0.4352c28.928 0.9472 69.4016 1.536 121.3184 1.7408a25.6 25.6 0 0 1-0.2048 51.2l-61.0816-0.4864c-27.392-0.3328-50.048-0.8448-68.0192-1.4848l-18.1248-0.8192c-9.472-0.512-17.1008-1.1008-22.912-1.7664a83.1744 83.1744 0 0 1-11.9552-2.0992 32.256 32.256 0 0 1-8.3968-3.456c-8.1152-4.7872-14.336-12.928-13.0304-25.472a217.6512 217.6512 0 0 1 196.9408-193.9456zM793.6 774.4a19.2 19.2 0 0 1 2.6112 38.2208L793.6 812.8h-51.2a19.2 19.2 0 0 1-2.6112-38.2208L742.4 774.4h51.2zM793.6 723.2a19.2 19.2 0 0 1 2.6112 38.2208L793.6 761.6h-51.2a19.2 19.2 0 0 1-2.6112-38.2208L742.4 723.2h51.2zM793.6 672a19.2 19.2 0 0 1 2.6112 38.2208L793.6 710.4h-51.2a19.2 19.2 0 0 1-2.6112-38.2208L742.4 672h51.2z" fill="#C043DE"></path></g></svg>

                  <h3 class="text-2xl font-semibold text-gray-900 dark:text-white">Students</h3>
               </div>
               <p class="text-gray-700 dark:text-gray-300 mt-2 md:mt-0">List of Students in {{ $section->grade_or_year_level }}-{{ $section->section_name }}.</p>

               <div id="table-loader" class="flex justify-center items-center py-10">
                  <svg role="status" class="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9765 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9765 100 50.5908ZM9.08125 50.5908C9.08125 73.5495 27.0413 91.5095 50 91.5095C72.9587 91.5095 90.9188 73.5495 90.9188 50.5908C90.9188 27.6321 72.9587 9.67209 50 9.67209C27.0413 9.67209 9.08125 27.6321 9.08125 50.5908Z" fill="currentColor"/>
                     <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5536C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7233 75.2124 7.41289C69.5422 4.10248 63.2754 1.94025 56.7335 1.05189C51.7661 0.367391 46.7345 0.446447 41.8062 1.27873C39.324 1.69443 37.8557 4.19778 38.4928 6.62326C39.1299 9.04874 41.6119 10.5012 44.1076 10.1076C47.8923 9.47543 51.7426 9.52629 55.4747 10.2485C60.8569 11.2887 65.968 13.4632 70.543 16.6697C75.118 19.8763 79.0733 24.0361 82.1918 28.9444C84.7348 32.8122 86.6207 37.1317 87.7824 41.708C88.4351 44.0608 91.5422 45.6781 93.9676 45.0409Z" fill="currentFill"/>
                  </svg>
                  <span>Loading data, please wait...</span>
               </div>

               <div id="student-datatable-container" class="mt-4">
                  <!-- Table content goes here -->
               </div>
            </div>
            <script>
               const sectionSlug = "{{ $section->slug }}";
            </script>
</x-app-layout>
