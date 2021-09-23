<template>
  <div class="card">
    <h2 class="card__title"> To Do List </h2>
    <input v-model="title" type="text" placeholder="Escribe una tarea" :disabled="isEditing"/>
    <button class="button card__button" @click="createTask()" :disabled="isEditing"> Agregar </button>
    <div class="card__body_wrapper">
      <p v-if="!tasks.length" class="text-gray"> No haz agregado tareas </p>
      <ul v-else>
        <li v-for="(task, index) in tasks" :key="index">
          <template v-if="!task.editing">
            <div class="task">
              <p class="task__title">{{ task.title }}</p>
              <button class="button task__button" @click="editTask( task )">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.2" d="M18.364 5.63603C17.458 4.73047 16.3691 4.02873 15.1702 3.57773C13.9713 3.12672 12.6899 2.93684 11.4117 3.02078C10.1335 3.10471 8.88794 3.46053 7.75829 4.06445C6.62864 4.66837 5.64091 5.50647 4.86114 6.52274C4.08137 7.539 3.52751 8.71001 3.2366 9.95749C2.94569 11.205 2.92443 12.5002 3.17422 13.7565C3.42402 15.0129 3.93913 16.2015 4.68512 17.2428C5.4311 18.2841 6.39078 19.1542 7.5 19.7948V16.5L12 6.75L16.5 16.5V19.7948C17.6954 19.1044 18.7159 18.1482 19.4827 17.0003C20.2495 15.8524 20.7421 14.5436 20.9222 13.1749C21.1024 11.8063 20.9654 10.4145 20.5218 9.10729C20.0782 7.80006 19.3399 6.61236 18.364 5.63603V5.63603Z" fill="#3370D7"/>
                  <path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.5 17.25C13.5 16.8522 13.658 16.4706 13.9393 16.1893C14.2206 15.908 14.6022 15.75 15 15.75C15.3978 15.75 15.7794 15.908 16.0607 16.1893C16.342 16.4706 16.5 16.8522 16.5 17.25" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M7.5 17.25C7.5 16.8522 7.65804 16.4706 7.93934 16.1893C8.22064 15.908 8.60218 15.75 9 15.75C9.39782 15.75 9.77936 15.908 10.0607 16.1893C10.342 16.4706 10.5 16.8522 10.5 17.25" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M13.5 20.8748V17.25C13.5 16.8522 13.342 16.4706 13.0607 16.1893C12.7794 15.908 12.3978 15.75 12 15.75C11.6022 15.75 11.2206 15.908 10.9393 16.1893C10.658 16.4706 10.5 16.8522 10.5 17.25V20.8748" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M16.5 19.7963V16.5L12 6.75L7.5 16.5V19.7966" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.0769 11.25H9.92308" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="task__button" @click="deleteTask( index )">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.2" d="M18.7496 5.25V19.5C18.7496 19.6989 18.6706 19.8897 18.53 20.0303C18.3893 20.171 18.1985 20.25 17.9996 20.25H5.99963C5.80072 20.25 5.60996 20.171 5.4693 20.0303C5.32865 19.8897 5.24963 19.6989 5.24963 19.5V5.25L18.7496 5.25Z" fill="#5E7187"/>
                  <path d="M20.2496 5.25L3.74963 5.25001" stroke="#5E7187" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M9.75 9.75V15.75" stroke="#5E7187" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14.25 9.75V15.75" stroke="#5E7187" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M18.7496 5.25V19.5C18.7496 19.6989 18.6706 19.8897 18.53 20.0303C18.3893 20.171 18.1985 20.25 17.9996 20.25H5.99963C5.80072 20.25 5.60996 20.171 5.4693 20.0303C5.32865 19.8897 5.24963 19.6989 5.24963 19.5V5.25" stroke="#5E7187" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15.75 5.25V3.75C15.75 3.35218 15.592 2.97064 15.3107 2.68934C15.0294 2.40804 14.6478 2.25 14.25 2.25H9.75C9.35218 2.25 8.97064 2.40804 8.68934 2.68934C8.40804 2.97064 8.25 3.35218 8.25 3.75V5.25" stroke="#5E7187" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </template>
          <template v-else>
            <div class="task-editing">
              <input v-model="editTitle" />
              <button class="task__button" @click="updateTask( task )">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path opacity="0.2" d="M20.0303 8.03033L15.9697 3.96967C15.829 3.82903 15.6383 3.75001 15.4393 3.75002H4.5C4.40151 3.75001 4.30398 3.76941 4.21299 3.8071C4.12199 3.84479 4.03931 3.90004 3.96967 3.96968C3.90002 4.03933 3.84478 4.12201 3.80709 4.213C3.7694 4.304 3.75 4.40152 3.75 4.50002V19.5C3.75 19.6989 3.82902 19.8897 3.96967 20.0303C4.11032 20.171 4.30109 20.25 4.5 20.25H19.5C19.6989 20.25 19.8897 20.171 20.0303 20.0303C20.171 19.8897 20.25 19.6989 20.25 19.5V8.56065C20.25 8.46216 20.2306 8.36463 20.1929 8.27364C20.1552 8.18265 20.1 8.09997 20.0303 8.03033V8.03033ZM12.0005 17.2508C11.4814 17.2508 10.9739 17.0969 10.5422 16.8084C10.1105 16.52 9.77405 16.11 9.57537 15.6304C9.37669 15.1507 9.3247 14.6229 9.42599 14.1137C9.52727 13.6045 9.77728 13.1368 10.1444 12.7697C10.5115 12.4026 10.9792 12.1526 11.4884 12.0513C11.9976 11.95 12.5254 12.002 13.0051 12.2006C13.4847 12.3993 13.8947 12.7358 14.1832 13.1675C14.4716 13.5991 14.6255 14.1067 14.6255 14.6258C14.6255 14.9706 14.5577 15.3119 14.4257 15.6304C14.2938 15.9489 14.1005 16.2382 13.8567 16.482C13.613 16.7257 13.3236 16.9191 13.0051 17.051C12.6866 17.1829 12.3453 17.2508 12.0005 17.2508V17.2508Z" fill="#3370D7"/>
                  <path d="M20.25 8.56066V19.5C20.25 19.6989 20.171 19.8897 20.0303 20.0303C19.8897 20.171 19.6989 20.25 19.5 20.25H4.5C4.30109 20.25 4.11032 20.171 3.96967 20.0303C3.82902 19.8897 3.75 19.6989 3.75 19.5V4.5C3.75 4.30109 3.82902 4.11032 3.96967 3.96967C4.11032 3.82902 4.30109 3.75 4.5 3.75H15.4393C15.5378 3.75 15.6354 3.7694 15.7264 3.80709C15.8173 3.84478 15.9 3.90003 15.9697 3.96967L20.0303 8.03033C20.1 8.09997 20.1552 8.18265 20.1929 8.27365C20.2306 8.36464 20.25 8.46217 20.25 8.56066Z" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M12.0005 17.2508C13.4503 17.2508 14.6255 16.0756 14.6255 14.6258C14.6255 13.1761 13.4503 12.0008 12.0005 12.0008C10.5508 12.0008 9.37555 13.1761 9.37555 14.6258C9.37555 16.0756 10.5508 17.2508 12.0005 17.2508Z" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M15 9.00085H9V3.75085" stroke="#3370D7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
              <button class="task__button"  @click="cancelEdit( task )">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" width="18px" height="18px">
                  <path fill="#f78f8f" d="M20,38.5C9.799,38.5,1.5,30.201,1.5,20S9.799,1.5,20,1.5S38.5,9.799,38.5,20S30.201,38.5,20,38.5z"/>
                  <path fill="#c74343" d="M20,2c9.925,0,18,8.075,18,18s-8.075,18-18,18S2,29.925,2,20S10.075,2,20,2 M20,1 C9.507,1,1,9.507,1,20s8.507,19,19,19s19-8.507,19-19S30.493,1,20,1L20,1z"/>
                  <path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-134.999 20 20)"/>
                  <path fill="#fff" d="M18.5 10H21.5V30H18.5z" transform="rotate(-45.001 20 20)"/>
                </svg>
              </button>
            </div>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./ToDoList.js"></script>
<style scoped lang="scss"></style>
