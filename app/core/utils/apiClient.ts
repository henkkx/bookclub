import logout from "app/auth/mutations/logout"
import { queryCache } from "react-query"
const apiURL = process.env.REACT_APP_API_URL

const GOOGLE_API = "https://www.googleapis.com/books/v1/volumes"

async function fetchBooksByQuery(query: string, page: number) {
  return client(`?q=${query}&startIndex=${page * 10}&maxResults=10`, { customApi: GOOGLE_API })
}

function buildHeaders(data: any, token: string, customHeaders): HeadersInit {
  let headers: HeadersInit = {}
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }
  if (data) {
    headers["Content-Type"] = "application/json"
  }

  return { ...headers, ...customHeaders }
}

async function client(
  endpoint: string,
  {
    data = {},
    token = "",
    headers: customHeaders = {},
    customApi = "",
    method = "GET",
    ...customConfig
  }
) {
  const config = {
    method,
    body: method === "POST" ? JSON.stringify(data) : undefined,

    headers: buildHeaders(data, token, customHeaders),
    ...customConfig,
  }
  const baseURL = customApi ? customApi : apiURL
  return window.fetch(`${baseURL}/${endpoint}`, config).then(async (response) => {
    if (response.status === 401) {
      //   queryCache.clear()
      //   //logout()
      //   // refresh the page for them
      //   window.location.assign(window.location)
      return Promise.reject({ message: "Please re-authenticate." })
    }
    const data = await response.json()
    if (response.ok) {
      return data
    } else {
      return Promise.reject(data)
    }
  })
}

export { client, fetchBooksByQuery }
