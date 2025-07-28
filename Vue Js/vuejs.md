
---

# 📘 Vue 3 (via CDN & Vite) – Notes & Examples

---

## 🚀 Getting Started

### ✅ Vue via Vite (CLI)

```bash
npm create vite@latest
cd vite-project
npm i
npm run dev
```

---

### ✅ Vue via CDN

Place the following script tags **at the bottom** of your HTML before `</body>`:

```html
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script src="main.js"></script>
</body>
```

---

### ✅ Creating and Mounting the App

```js
const app = Vue.createApp({});
app.mount("#app");
```

Mount it to a specific element in HTML:

```html
<div id="app"></div>
```

---

## 🧵 String Interpolation

### ✅ Declaring Properties

```js
const app = Vue.createApp({
  data() {
    return {
      count: 0,
      isLoggedIn: false,
      link: "https://www.google.com",
      htmlContent: "<h1>Hello World</h1>"
    };
  },
  methods: {
    checkLogin() {
      this.isLoggedIn = !this.isLoggedIn;
    }
  }
});
app.mount("#app");
```

### ✅ Usage in Template

```html
<p>{{ count }}</p>
<a :href="link">Google</a>
<div v-html="htmlContent"></div>
```

---

## 🧨 Event Handling

### ✅ Basic

```html
<button @click="checkLogin()">Login</button>
```

### ✅ With Event Argument

```html
<button @click="checkLogin($event)">Login</button>
```

### ✅ Prevent Default

```js
methods: {
  checkLogin(event, name) {
    event.preventDefault();
    this.isLoggedIn = !this.isLoggedIn;
  }
}
```

Or in template:

```html
<a href="" @click.prevent="checkLogin($event, 'Chandra')">
  {{ isLoggedIn ? "Logout" : "Login" }}
</a>
```

---

## ⚖️ Conditional Rendering

### ✅ `v-if`, `v-else-if`, `v-else`

```html
<div v-if="isLoggedIn">User is logged in</div>
<div v-else-if="!isLoggedIn">User is not logged in</div>
<div v-else>In else block</div>
```

### ✅ `v-show`

```html
<div v-show="isLoggedIn">User is logged in</div>
<div v-show="!isLoggedIn">User is not logged in</div>
```

> ⚠️ `v-if` is lazy (won’t render until true).
> `v-show` always renders but toggles visibility.

---

## 📃 List Rendering

```html
<tr v-for="item in list" :key="item.id">
  <td>{{ item.id }}</td>
  <td>{{ item.name }}</td>
  <td>{{ item.uid }}</td>
  <td><button @click="handleDelete(item.id)">Delete</button></td>
</tr>
```

---

## 🔁 Two-Way Binding (`v-model`)

### ✅ Standard Binding

```html
<input :value="name" @input="onNameChange($event)">
```

### ✅ With `v-model`

```html
<input type="text" v-model="name">
<div>{{ name }}</div>
```

> ⚠️ Downside: re-renders all computed methods on any change.

---

## 🧠 Computed vs Watchers

### ✅ Computed Properties

```js
computed: {
  computedMessage() {
    return this.isLoggedIn
      ? "Computed / User is logged In"
      : "Computed / User is not logged In";
  }
}
```

### ✅ Watchers

```js
watch: {
  isLoggedIn() {
    this.watcherMessage = this.isLoggedIn
      ? "Watcher / User is logged In"
      : "Watcher / User is not logged In";
  }
}
```

---

## 🎨 Dynamic Class Binding

### ✅ Examples

```html
<div :class="boxActiveClasses()" @click="handleClick"></div>
```

```js
data() {
  return {
    activeClass: false
  };
},
methods: {
  handleClick() {
    this.activeClass = !this.activeClass;
  },
  boxActiveClasses() {
    return {
      box: true,
      active: this.activeClass
    };
  }
}
```

---

# 🧩 Assignments by Levels

---

## 🟢 Level 1: Basics

### 🔢 Counter App

* Show a number.
* Buttons to increment & decrement.

### 🔁 Text Reverser

* Input box to type text.
* Reverse displayed in real-time.

### 🖱️ Simple Click Tracker

* Show button click counts.
* Track multiple buttons separately.

---

## 🟡 Level 2: Lists & Forms

### ✅ Basic Todo List

* Input to add.
* List to display todos.
* Button to remove.

### 🎬 Favorite Movies List

* Form to add a movie title.
* Display movies.
* Like counter for each movie.

### 📝 Simple Survey Form

* Fields: name, email, rating.
* Show submitted data below.

---

## 🔵 Level 3: Components & Interaction

### 🔘 Toggle Box Component

* Reusable.
* Shows/hides content with a button.

### 💬 Modal Pop-up

* Button to open modal.
* Modal is a separate component.
* Click to close.

### ➕ Counter Component

* Reusable counter.
* Multiple instances with separate states.

---
