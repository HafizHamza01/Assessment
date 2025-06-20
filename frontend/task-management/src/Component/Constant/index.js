export const API_URL = import.meta.env.VITE_APP_BASE_URL

export const create_task = API_URL + "/api/v1/tasks/create/" // POST METHOD
export const task_detail= API_URL + "/api/v1/tasks/count/" // GET METHOD
export const get_task = API_URL + "/api/v1/tasks/get/" // GET METHOD
export const update_task = API_URL + "/api/v1/tasks/update/" // PUT METHOD
export const dalete_task = API_URL + "/api/v1/tasks/delete/" //DELETE METHOD