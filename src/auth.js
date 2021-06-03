export function getAuthForm() {
  return `
    <form class="mui-form" id="auth-form">
            <div class="mui-textfield mui-textfield--float-label">
              <input type="text" id="email">
              <label for="email">Email</label>
            </div>
            <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password">
            <label for="password">Пароль</label>
          </div>
            <button type="submit" 
            class="mui-btn mui-btn--raised mui-btn--primary">
            Войти
        </button>
          </form>
    `
}

export function authWithEmailandPassword(email, password) {
  const apiKey = 'AIzaSyDsuhTeRmECkASlVv4VA_LbIjtuRN6oqOs'
  return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => data.idToken)
}
