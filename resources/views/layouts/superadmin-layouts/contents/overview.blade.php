<x-app-layout>
    <div class="min-h-screen flex flex-col sm:ml-64">
        <div class="flex-grow p-4">
            <div class="p-4">
               <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div class="flex items-center justify-between border-t-4 border-violet-500 h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-violet-100 p-2 rounded-full border border-green-800">
                              <svg class="w-7 h-7" fill="#45177d" viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" stroke="#45177d"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <circle cx="20.15" cy="9.99" r="4.28"></circle> <circle cx="31.84" cy="9.99" r="4.28"></circle> <circle cx="11.36" cy="19.96" r="5.42"></circle> <circle cx="40.78" cy="19.96" r="5.42"></circle> <circle cx="26.07" cy="23.06" r="5.42"></circle> <path d="m32.19 46.29a2.79 2.79 0 0 0 2.17-.93 3.1 3.1 0 0 0 .93-2.17v-7a4.66 4.66 0 0 0 -4.64-4.64h-9.3a4.66 4.66 0 0 0 -4.64 4.64v7a3.18 3.18 0 0 0 3.1 3.1z"></path> <path d="m12 43.19v-7a9.13 9.13 0 0 1 2.63-6.42.81.81 0 0 0 -.08-1.13.79.79 0 0 0 -.46-.19h-7.44a4.66 4.66 0 0 0 -4.65 4.67v7a3.18 3.18 0 0 0 3.1 3.1z"></path> <path d="m46.9 43.19a2.84 2.84 0 0 0 2.17-.93 3.1 3.1 0 0 0 .93-2.17v-7a4.66 4.66 0 0 0 -4.65-4.65h-7.43a.77.77 0 0 0 -.54 1.32 9.28 9.28 0 0 1 2.62 6.46v7z"></path> </g> </g></svg>
                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Pre-Registered</p>
                           <p id="total-pre-registered" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between border-t-4 border-green-500 h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-green-100 p-2 rounded-full border border-green-800">
                              <svg class="w-7 h-7" fill="#138669" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 612 612" xml:space="preserve" stroke="#138669"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M491.656,514.564l114.354-95.303c3.643-3.037,4.139-8.5,1.104-12.141l-11.034-13.24c-3.035-3.641-8.498-4.137-12.14-1.104 l-96.209,80.176l-40.244-40.236c-3.353-3.352-8.838-3.352-12.189,0l-12.189,12.189c-3.352,3.352-3.352,8.836,0,12.189 l56.936,56.941C483.104,517.097,488.33,517.335,491.656,514.564z M304.228,264.532c46.677,0,84.514-37.838,84.514-84.514 s-37.838-84.514-84.514-84.514s-84.514,37.838-84.514,84.514S257.552,264.532,304.228,264.532z M348.27,209.61 c-4.179,17.595-22.078,24.202-43.53,24.202s-39.352-6.606-43.53-24.202H348.27z M448.225,351.96v27.857 c0,4.131-3.83,8.93-7.603,10.607c-14.62,6.506-54.893,19.82-136.382,19.82c-81.674,0-120.376-13.375-134.919-19.865 c-3.399-1.516-5.546-4.941-5.546-8.664V351.96c0-42.309,31.243-77.31,72.618-81.189c19.034,14.31,42.22,22.902,67.793,22.902 c25.638,0,49.057-8.636,68.107-23.009C414.184,273.95,448.225,309.228,448.225,351.96z M612,276.427v16.487 c0,2.443-2.876,5.284-5.108,6.277c-8.653,3.851-32.794,11.73-81.021,11.73c-48.229,0-72.705-7.879-81.357-11.73 c-2.233-0.993-4.907-3.833-4.907-6.277v-16.487c0-25.256,20.289-46.112,45.025-48.105c11.254,8.503,25.38,13.61,40.549,13.61 c15.2,0,29.273-5.129,40.544-13.665C590.761,229.899,612,250.919,612,276.427z M165.603,299.192 c-8.653,3.85-33.635,11.731-81.863,11.731c-47.515,0-70.75-7.65-79.701-11.558C1.8,298.388,0,295.522,0,293.08v-16.653 c0-24.998,18.154-45.686,42.589-48.039c11.267,8.462,24.912,13.543,40.041,13.543c15.245,0,29.127-5.158,40.432-13.738 c25.495,0.875,49.333,22.221,49.333,48.234v16.487C172.395,295.358,167.835,298.199,165.603,299.192z M82.742,124.646 c-27.624,0-50.019,22.394-50.019,50.019c0,27.624,22.394,50.019,50.019,50.019s50.019-22.394,50.019-50.019 C132.76,147.04,110.367,124.646,82.742,124.646z M82.742,207.397c-12.956,0-23.766-6.202-26.29-14.617h52.581 C106.509,201.195,95.698,207.397,82.742,207.397z M525.713,124.646c-27.625,0-50.019,22.394-50.019,50.019 c0,27.624,22.395,50.019,50.019,50.019c27.625,0,50.02-22.394,50.02-50.019C575.732,147.04,553.338,124.646,525.713,124.646z M525.713,207.397c-12.956,0-23.767-6.202-26.29-14.617h52.58C549.479,201.195,538.669,207.397,525.713,207.397z"></path> </g> </g></svg>
                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Registered</p>
                           <p id="total-registered" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>

                  <div class="flex items-center justify-between border-t-4 border-orange-500 h-36 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg p-4">
                     <div class="flex items-center">
                           <div class="bg-orange-100 p-2 rounded-full border border-green-800">
                              <svg class="w-7 h-7" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path style="fill:#e18160;" d="M414.207,512H97.794c-10.686,0-19.349-8.663-19.349-19.349v-61.366 c0-97.904,79.651-177.555,177.555-177.555s177.555,79.651,177.555,177.555v61.366C433.556,503.337,424.893,512,414.207,512z"></path> <path style="fill:#da622f;" d="M256,253.73V512h158.206c10.686,0,19.349-8.663,19.349-19.349v-61.366 C433.556,333.381,353.905,253.73,256,253.73z"></path> <g> <path style="fill:#FFEAB2;" d="M377.435,301.878c-68.198-64.035-174.303-64.381-242.868,0 c2.973,2.973,104.769,104.769,107.753,107.753c3.778,3.778,8.73,5.667,13.681,5.667c4.952,0,9.904-1.888,13.681-5.667 C272.664,406.648,374.015,305.297,377.435,301.878z"></path> <path style="fill:#FFEAB2;" d="M256,238.468c-65.725,0-119.197-53.472-119.197-119.197S190.275,0.074,256,0.074 S375.197,53.545,375.197,119.27S321.726,238.468,256,238.468z"></path> </g> <path style="fill:#FFE08C;" d="M256,0.075v238.393c65.725,0,119.197-53.472,119.197-119.197C375.198,53.545,321.726,0.075,256,0.075 z"></path> <path style="fill:#e18160;" d="M369.976,84.323C330.695-43.916,136.803-18.349,136.803,119.271c0,8.787,0.992,17.64,2.947,26.313 c2.619,11.604,14.995,18.109,26.028,13.721c27.025-10.751,50.442-28.912,67.68-52.112c7.119,4.446,14.775,8.194,22.896,11.138 c35.513,12.875,74.043,8.51,105.694-12.135C369.268,101.486,372.502,92.567,369.976,84.323z"></path> <path style="fill:#FFE08C;" d="M377.435,301.878C343.777,270.273,300.707,253.73,256,253.73v161.566 c4.952,0,9.904-1.888,13.681-5.667L377.435,301.878z"></path> <path style="fill:#da622f;" d="M369.976,84.323C353.956,32.025,306.274,0.13,256,0v118.197c0.119,0.044,0.235,0.09,0.353,0.134 c35.513,12.875,74.043,8.51,105.694-12.135C369.268,101.486,372.502,92.567,369.976,84.323z"></path> </g></svg>
                           </div>
                     </div>
                     <div class="ml-4">
                           <p class="text-lg font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">Total Teachers</p>
                           <p id="total-teachers" class="text-3xl font-bold text-gray-900 dark:text-white">-</p>
                     </div>
                  </div>
               </div>

            </div>
        </div>
    </div>
</x-app-layout>