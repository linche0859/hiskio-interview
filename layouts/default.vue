<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="https://bulma.io">
          <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true" />
          <span aria-hidden="true" />
          <span aria-hidden="true" />
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a class="navbar-item">
            Home
          </a>

          <a class="navbar-item">
            Documentation
          </a>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              More
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                About
              </a>
              <a class="navbar-item">
                Jobs
              </a>
              <a class="navbar-item">
                Contact
              </a>
              <hr class="navbar-divider">
              <a class="navbar-item">
                Report an issue
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>

<style>
html {
  box-sizing: border-box;
  font-family:
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: 16px;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  text-size-adjust: 100%;
  text-size-adjust: 100%;
  word-spacing: 1px;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}

.button--green {
  border: 1px solid #3b8070;
  border-radius: 4px;
  color: #3b8070;
  display: inline-block;
  padding: 10px 30px;
  text-decoration: none;
}

.button--green:hover {
  background-color: #3b8070;
  color: #fff;
}

.button--grey {
  border: 1px solid #35495e;
  border-radius: 4px;
  color: #35495e;
  display: inline-block;
  margin-left: 15px;
  padding: 10px 30px;
  text-decoration: none;
}

.button--grey:hover {
  background-color: #35495e;
  color: #fff;
}
</style>
