<x-app-layout>
         <div class="grid grid-cols-1 md:grid-cols-3 gap-4 items-center mb-8 relative">
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
            <div class="flex items-center justify-between h-36 rounded-lg border-t-4 border-blue-500 bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-blue-200 p-2 rounded-full border border-blue-800">
                  <svg class="w-7 h-7" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 503.322 503.322" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path style="fill:#E6E7E8;" d="M0,472.949V143.186h503.322v329.763c0,9.589-7.767,17.356-17.356,17.356H17.356 C7.767,490.305,0,482.538,0,472.949"></path> <path style="fill:#E64C3C;" d="M0,143.186V73.763c0-9.589,7.767-17.356,17.356-17.356h468.61c9.589,0,17.356,7.767,17.356,17.356 v69.424H0z"></path> <g> <path style="fill:#E6E7E8;" d="M442.576,99.797c-4.79,0-8.678-3.879-8.678-8.678s3.888-8.678,8.678-8.678 c14.353,0,26.034-11.681,26.034-26.034s-11.681-26.034-26.034-26.034c-14.353,0-26.034,11.681-26.034,26.034 c0,4.799-3.888,8.678-8.678,8.678c-4.79,0-8.678-3.879-8.678-8.678c0-23.925,19.465-43.39,43.39-43.39 c23.925,0,43.39,19.465,43.39,43.39S466.501,99.797,442.576,99.797"></path> <path style="fill:#E6E7E8;" d="M347.119,99.797c-4.79,0-8.678-3.879-8.678-8.678s3.888-8.678,8.678-8.678 c14.353,0,26.034-11.681,26.034-26.034s-11.681-26.034-26.034-26.034c-14.353,0-26.034,11.681-26.034,26.034 c0,4.799-3.888,8.678-8.678,8.678c-4.79,0-8.678-3.879-8.678-8.678c0-23.925,19.465-43.39,43.39-43.39 c23.925,0,43.39,19.465,43.39,43.39S371.044,99.797,347.119,99.797"></path> <path style="fill:#E6E7E8;" d="M251.661,99.797c-4.79,0-8.678-3.879-8.678-8.678s3.888-8.678,8.678-8.678 c14.353,0,26.034-11.681,26.034-26.034s-11.681-26.034-26.034-26.034c-14.353,0-26.034,11.681-26.034,26.034 c0,4.799-3.888,8.678-8.678,8.678s-8.678-3.879-8.678-8.678c0-23.925,19.465-43.39,43.39-43.39s43.39,19.465,43.39,43.39 S275.586,99.797,251.661,99.797"></path> <path style="fill:#E6E7E8;" d="M156.203,99.797c-4.79,0-8.678-3.879-8.678-8.678s3.888-8.678,8.678-8.678 c14.353,0,26.034-11.681,26.034-26.034s-11.681-26.034-26.034-26.034c-14.353,0-26.034,11.681-26.034,26.034 c0,4.799-3.888,8.678-8.678,8.678s-8.678-3.879-8.678-8.678c0-23.925,19.465-43.39,43.39-43.39s43.39,19.465,43.39,43.39 S180.129,99.797,156.203,99.797"></path> <path style="fill:#E6E7E8;" d="M60.746,99.797c-4.79,0-8.678-3.879-8.678-8.678s3.888-8.678,8.678-8.678 c14.353,0,26.034-11.681,26.034-26.034S75.099,30.373,60.746,30.373S34.712,42.053,34.712,56.407c0,4.799-3.888,8.678-8.678,8.678 s-8.678-3.879-8.678-8.678c0-23.925,19.465-43.39,43.39-43.39s43.39,19.465,43.39,43.39S84.671,99.797,60.746,99.797"></path> </g> <g> <polygon style="fill:#F0C419;" points="69.428,247.322 121.496,247.322 121.496,195.254 69.428,195.254 "></polygon> <polygon style="fill:#F0C419;" points="173.564,247.322 225.631,247.322 225.631,195.254 173.564,195.254 "></polygon> <polygon style="fill:#F0C419;" points="277.699,247.322 329.767,247.322 329.767,195.254 277.699,195.254 "></polygon> <polygon style="fill:#F0C419;" points="381.835,247.322 433.903,247.322 433.903,195.254 381.835,195.254 "></polygon> <polygon style="fill:#F0C419;" points="69.428,342.78 121.496,342.78 121.496,290.712 69.428,290.712 "></polygon> <polygon style="fill:#F0C419;" points="173.564,342.78 225.631,342.78 225.631,290.712 173.564,290.712 "></polygon> <polygon style="fill:#F0C419;" points="69.428,438.237 121.496,438.237 121.496,386.169 69.428,386.169 "></polygon> <polygon style="fill:#F0C419;" points="173.564,438.237 225.631,438.237 225.631,386.169 173.564,386.169 "></polygon> </g> <path style="fill:#6ABDA0;" d="M442.576,368.814c0-47.928-38.851-86.78-86.78-86.78s-86.78,38.851-86.78,86.78 s38.851,86.78,86.78,86.78S442.576,416.742,442.576,368.814"></path> <path style="fill:#FFFFFF;" d="M347.119,420.881c-2.291,0-4.504-0.902-6.135-2.543l-34.712-34.712 c-3.393-3.393-3.393-8.878,0-12.271s8.878-3.393,12.271,0l27.231,27.231l46.193-69.302c2.655-3.992,8.044-5.059,12.036-2.404 c3.983,2.664,5.059,8.044,2.404,12.036l-52.068,78.102c-1.441,2.161-3.784,3.567-6.361,3.818 C347.683,420.864,347.405,420.881,347.119,420.881"></path> </g> </g></svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Present</p>
                  <p id="total-present" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
            <!-- Total Late Card -->
            <div class="flex items-center justify-between h-36 rounded-lg border-t-4 border-red-500 bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-red-200 p-2 rounded-full border border-red-800">
                  <svg class="w-7 h-7" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 58 58" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <g> <polygon style="fill:#F05565;" points="46.5,4 46.5,8 39.5,8 39.5,4 15.5,4 15.5,8 8.5,8 8.5,4 0.5,4 0.5,15 54.5,15 54.5,4 "></polygon> <polygon style="fill:#36495E;" points="8.5,15 0.5,15 0.5,58 54.5,58 54.5,15 46.5,15 39.5,15 15.5,15 "></polygon> <path style="fill:#D5D0BB;" d="M37.5,22h-2h-7h-2h-7h-2h-9v9v2v7v2v9h9h2h7h2h7h2h9v-9v-2v-7v-2v-9H37.5z M28.5,24h7v7h-7V24z M35.5,40h-7v-7h7V40z M19.5,33h7v7h-7V33z M19.5,24h7v7h-7V24z M10.5,24h7v7h-7V24z M10.5,33h7v7h-7V33z M17.5,49h-7v-7h7V49z M26.5,49h-7v-7h7V49z M35.5,49h-7v-7h7V49z M44.5,49h-7v-7h7V49z M44.5,40h-7v-7h7V40z M37.5,31v-7h7v7H37.5z"></path> <rect x="8.5" style="fill:#36495E;" width="7" height="8"></rect> <rect x="39.5" style="fill:#36495E;" width="7" height="8"></rect> <rect x="19.5" y="33" style="fill:#7F6E5D;" width="7" height="7"></rect> </g> <g> <path style="fill:#ef1f1f;" d="M56.261,57H32.57c-0.955,0-1.55-1.036-1.069-1.861l11.845-20.306c0.478-0.819,1.66-0.819,2.138,0 L57.33,55.139C57.811,55.964,57.216,57,56.261,57z"></path> <path style="fill:#FFFFFF;" d="M44.5,50c-0.552,0-1-0.448-1-1v-8c0-0.552,0.448-1,1-1s1,0.448,1,1v8 C45.5,49.552,45.052,50,44.5,50z"></path> <path style="fill:#FFFFFF;" d="M44.5,54c-0.26,0-0.52-0.11-0.71-0.29c-0.18-0.19-0.29-0.45-0.29-0.71c0-0.26,0.11-0.52,0.29-0.71 c0.38-0.37,1.04-0.37,1.42,0c0.18,0.19,0.29,0.45,0.29,0.71c0,0.26-0.11,0.52-0.29,0.71C45.02,53.89,44.77,54,44.5,54z"></path> </g> </g> </g></svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Late</p>
                  <p id="total-late" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
            <!-- Total Absent Card -->
            <div class="flex items-center justify-between h-36 rounded-lg border-t-4 border-gray-500 bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-gray-200 p-2 rounded-full border border-gray-800">
                  <svg class="w-7 h-7" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="25.695" y="178.18" style="fill:#FFFFFF;" width="459.05" height="311.02"></rect> <rect x="254.74" y="178.18" style="fill:#C6C5CA;" width="230.01" height="311.02"></rect> <path style="fill:#F7603E;" d="M495.367,69.337H16.633C7.447,69.337,0,76.785,0,85.971V492.33c0,9.186,7.447,16.633,16.633,16.633 h478.734c9.186,0,16.633-7.447,16.633-16.633V85.971C512,76.785,504.553,69.337,495.367,69.337z M33.266,475.698V189.822h445.467 v285.876H33.266z"></path> <path style="fill:#F53000;" d="M495.367,69.337H255.186v120.484h223.548v285.876H255.186v33.266h240.181 c9.186,0,16.633-7.447,16.633-16.633V85.971C512,76.785,504.553,69.337,495.367,69.337z"></path> <g> <path style="fill:#9D2217;" d="M73.589,115.681c0,15.31,12.411,27.722,27.722,27.722s27.722-12.412,27.722-27.722V69.337H73.589 V115.681z"></path> <path style="fill:#9D2217;" d="M398.491,115.681c0,15.31,12.411,27.722,27.722,27.722s27.722-12.412,27.722-27.722V69.337h-55.444 V115.681z"></path> </g> <g> <path style="fill:#57565C;" d="M296.575,303.615c0,5.243-4.25,9.493-9.493,9.493H223.44c-5.243,0-9.493-4.25-9.493-9.493v-63.642 c0-5.243,4.25-9.493,9.493-9.493h63.642c5.243,0,9.493,4.25,9.493,9.493V303.615z"></path> <path style="fill:#57565C;" d="M163.509,303.615c0,5.243-4.25,9.493-9.493,9.493H90.374c-5.243,0-9.493-4.25-9.493-9.493v-63.642 c0-5.243,4.25-9.493,9.493-9.493h63.642c5.243,0,9.493,4.25,9.493,9.493L163.509,303.615L163.509,303.615z"></path> <path style="fill:#57565C;" d="M163.509,425.96c0,5.243-4.25,9.493-9.493,9.493H90.374c-5.243,0-9.493-4.25-9.493-9.493v-63.642 c0-5.243,4.25-9.493,9.493-9.493h63.642c5.243,0,9.493,4.25,9.493,9.493L163.509,425.96L163.509,425.96z"></path> </g> <g> <path style="fill:#2D2E30;" d="M431.119,303.615c0,5.243-4.25,9.493-9.493,9.493h-63.642c-5.243,0-9.493-4.25-9.493-9.493v-63.642 c0-5.243,4.25-9.493,9.493-9.493h63.642c5.243,0,9.493,4.25,9.493,9.493V303.615z"></path> <path style="fill:#2D2E30;" d="M431.119,425.96c0,5.243-4.25,9.493-9.493,9.493h-63.642c-5.243,0-9.493-4.25-9.493-9.493v-63.642 c0-5.243,4.25-9.493,9.493-9.493h63.642c5.243,0,9.493,4.25,9.493,9.493V425.96z"></path> </g> <path style="fill:#F53000;" d="M221.805,444.228c-4.257,0-8.514-1.623-11.761-4.872c-6.496-6.496-6.496-17.027,0-23.523l66.91-66.91 c6.495-6.496,17.027-6.496,23.523,0s6.496,17.027,0,23.523l-66.91,66.91C230.319,442.603,226.062,444.228,221.805,444.228z"></path> <path style="fill:#F7603E;" d="M288.715,444.228c-4.257,0-8.514-1.623-11.761-4.872l-66.91-66.91 c-6.496-6.496-6.496-17.027,0-23.523c6.495-6.496,17.027-6.496,23.523,0l66.91,66.91c6.496,6.496,6.496,17.027,0,23.523 C297.229,442.603,292.972,444.228,288.715,444.228z"></path> <g> <path style="fill:#C9C6CF;" d="M93.548,135.918c-15.464,0-28-12.536-28-28V31.036c0-15.464,12.536-28,28-28s28,12.536,28,28v76.882 C121.548,123.382,109.012,135.918,93.548,135.918z"></path> <path style="fill:#C9C6CF;" d="M418.45,135.918c-15.464,0-28-12.536-28-28V31.036c0-15.464,12.536-28,28-28s28,12.536,28,28v76.882 C446.45,123.382,433.914,135.918,418.45,135.918z"></path> </g> <path style="fill:#9D2217;" d="M235.485,115.681c0,15.31,12.411,27.722,27.722,27.722s27.722-12.412,27.722-27.722V69.337h-55.444 L235.485,115.681L235.485,115.681z"></path> <rect x="33.27" y="189.82" style="fill:#C6C5CA;" width="445.47" height="18.635"></rect> <path style="fill:#C9C6CF;" d="M255.445,135.918c-15.464,0-28-12.536-28-28V31.036c0-15.464,12.536-28,28-28s28,12.536,28,28v76.882 C283.445,123.382,270.909,135.918,255.445,135.918z"></path> <g> <path style="fill:#A3A1A8;" d="M93.548,3.314V135.64c15.311,0,27.722-12.412,27.722-27.722V31.036 C121.27,15.725,108.86,3.314,93.548,3.314z"></path> <path style="fill:#A3A1A8;" d="M255.445,3.314c-0.237,0-0.471,0.012-0.706,0.018v132.291c0.236,0.006,0.47,0.018,0.706,0.018 c15.311,0,27.722-12.412,27.722-27.722V31.036C283.167,15.725,270.756,3.314,255.445,3.314z"></path> <path style="fill:#A3A1A8;" d="M418.45,3.314V135.64c15.311,0,27.722-12.412,27.722-27.722V31.036 C446.172,15.725,433.762,3.314,418.45,3.314z"></path> </g> <path style="fill:#2D2E30;" d="M287.081,230.478h-32.343v82.629h32.343c5.243,0,9.493-4.25,9.493-9.493v-63.642 C296.575,234.728,292.324,230.478,287.081,230.478z"></path> </g></svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Absent</p>
                  <p id="total-absent" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
            <!-- Total Excuse Card -->
            <div class="flex items-center justify-between h-36 rounded-lg border-t-4 border-yellow-300 bg-gray-50 dark:bg-gray-800 shadow-lg p-5">
               <div class="flex items-center">
                  <div class="bg-yellow-200 p-2 rounded-full border border-yellow-800">
                  <svg class="w-7 h-7" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 310 310" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g id="XMLID_1003_"> <g id="XMLID_1004_"> <rect id="XMLID_1005_" x="15" y="50" style="fill:#78B9EB;" width="280" height="260"></rect> <rect id="XMLID_1006_" x="15" y="29.998" style="fill:#0052B4;" width="140" height="70"></rect> <rect id="XMLID_1007_" x="155" y="29.998" style="fill:#006DF0;" width="140" height="70"></rect> <g id="XMLID_1008_"> <rect id="XMLID_1009_" x="65" y="190" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_1010_" x="165" y="190" style="fill:#006DF0;" width="30" height="30"></rect> <rect id="XMLID_1011_" x="115" y="190" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_1012_" x="215" y="190" style="fill:#FFFFFF;" width="30" height="30"></rect> </g> <rect id="XMLID_58_" x="215" y="130" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_57_" x="115" y="130" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_56_" x="165" y="130" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_55_" x="65" y="130" style="fill:#006DF0;" width="30" height="30"></rect> <rect id="XMLID_54_" x="215" y="250" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_53_" x="115" y="250" style="fill:#006DF0;" width="30" height="30"></rect> <rect id="XMLID_52_" x="165" y="250" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_51_" x="65" y="250" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_50_" x="215.001" style="fill:#003778;" width="30" height="60"></rect> <rect id="XMLID_49_" x="65.002" style="fill:#003778;" width="30" height="60"></rect> </g> <rect id="XMLID_1013_" x="15" y="50" style="fill:#78B9EB;" width="280" height="260"></rect> <rect id="XMLID_1014_" x="15" y="29.998" style="fill:#0052B4;" width="140" height="70"></rect> <rect id="XMLID_1015_" x="155" y="29.998" style="fill:#006DF0;" width="140" height="70"></rect> <rect id="XMLID_1016_" x="65" y="190" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_1017_" x="165" y="190" style="fill:#FFDA44;" width="30" height="30"></rect> <rect id="XMLID_1018_" x="115" y="190" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_1019_" x="215" y="190" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_40_" x="215" y="130" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_39_" x="115" y="130" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_38_" x="165" y="130" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_37_" x="65" y="130" style="fill:#FFDA44;" width="30" height="30"></rect> <rect id="XMLID_36_" x="215" y="250" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_35_" x="115" y="250" style="fill:#FFDA44;" width="30" height="30"></rect> <rect id="XMLID_34_" x="165" y="250" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_33_" x="65" y="250" style="fill:#FFFFFF;" width="30" height="30"></rect> <rect id="XMLID_32_" x="215.001" style="fill:#003778;" width="30" height="60"></rect> <rect id="XMLID_3_" x="65.002" style="fill:#003778;" width="30" height="60"></rect> </g> </g></svg>
                  </div>
               </div>
               <div class="ml-4">
                  <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Excuse</p>
                  <p id="total-excuse" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
               </div>
            </div>
         </div>
         <!-- Student Watch Position -->
         <div id="student-watch-position"></div>
</x-app-layout>
