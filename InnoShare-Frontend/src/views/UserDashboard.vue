<script setup lang="ts">

</script>

<template>
  <body>
  <div id="drag" class="cv instaFade wrap">
    <div class="mainDetails">
      <div id="headshot" class="">
        <img :src= "profileURL" :title="'Hi, I\'m ' + fullname + '!'" 
             :alt= "fullname" />
      </div>

      <div id="name">
        <h1 class="quickFade delayTwo">{{ fullname }}</h1>
        <h4 class="quickFade delayThree">{{ username }}</h4>
        <h4 class="quickFade delayThree">email: {{ email }}</h4>
      </div>

      <!-- <div id="contactDetails" class="quickFade delayFour">
        <ul>
          <li><a href="//linkedin.com/in/jennifermogan" title="LinkedIn"><i class="fa fa-linkedin-square" aria-hidden="true"></i></a></li>
        </ul>
      </div> -->
      <div class="clear"></div>
    </div>

    <div id="mainArea" class="quickFade delayFive">
      <section>
        <div class="sectionTitle">
          <h1>认证情况</h1>
        </div>

        <div class="sectionContent">
          <div v-if="isAuthenticated">
            <h1>已认证</h1>
          </div>
          <div v-else>
            <article>
              <h1>未认证</h1>
            </article>
          <el-button>去认证</el-button>
          </div>
        </div>
        <div class="clear"></div>
      </section>
      <section>
        <article>
          <div class="sectionTitle">
            <h1>院校</h1>
          </div>

          <div class="sectionContent">
            <article>
              <h3>{{ instituition }}</h3>
            </article>
          </div>
        </article>
      <div class="clear"></div>
      </section>
      
      <section>
        <div class="sectionTitle">
          <h1>研究领域</h1>
        </div>

        <div class="sectionContent">
          <article>
            <h3>{{ fieldOfStudy }}</h3>
          </article>
        </div>
        <div class="clear"></div>
      </section>


      <section>
        <div class="sectionTitle">
          <h1>个人经历</h1>
        </div>

        <div class="sectionContent">
          <article>
            <h3>{{ experience }}</h3>
          </article>
        </div>
        <div class="clear"></div>
      </section>

      <section>
        <div class="sectionTitle">
          <h1>学术成果</h1>
        </div>

        <div class="sectionContent">
          <el-button>查看学术成果</el-button>
          <el-button>上传学术成果</el-button>
        </div>
        <div class="clear"></div>
      </section>
      
    </div>
  </div>
  </body>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  const username = ref('PlutoFX');
  const fullname = ref('Ibuki Ayapa');
  const email = ref('exaple@gmail.com');
  const isAuthenticated = ref(false);
  const profileURL = ref('https://th.bing.com/th/id/OIP.EyNjv0tcjuB_E5RFnPrw3wAAAA?w=203&h=145&c=7&r=0&o=5&dpr=1.5&pid=1.7');
  const instituition = ref('Beihang University');
  const experience = ref('Working / Studying Experience');
  const fieldOfStudy = ref('Software Engineer');


</script>

<style scoped>
#drag {
  padding-bottom: 200px;
}

video {
  border: 0;
  font: inherit;
  font-size: 100%;
  margin: 0;
  padding: 0;
  vertical-align: baseline;
}

section {
  display: block;
}

/* We need to minimize the use of code, so we will be using roots...this is in the works */
:root {
  --highlight: #a29400;
  --header-font: "Gudea", Helvetica, Arial, sans-serif;
  --content-font: "Lato", Helvetica, Arial, sans-serif;
}

html,
body {
  background: #fff;
  font-family: "Lato", Helvetica, Arial, sans-serif;
  font-feature-settings: "calt","liga","hist","onum","pnum";
  font-size: 1rem;
  color: #222;
}

.clear {
  clear: both;
}

#menu {
  position: fixed;
  right: 0;
  top: 15%;
  width: 8em;
  margin-top: -2.5em;
}

p {
  font-size: 1em;
  line-height: 1.4em;
  margin-bottom: 20px;
  color: #444;
  transition: all 1s linear;
  -o-transition: all 1s linear;
  -moz-transition: all 1s linear;
  -webkit-transition: all 1s linear;
}

a {
  color: inherit;
}

.cv {
  /* width: 90%; */
  max-width: 54rem;
  background: #fff;
  margin: 30px auto;
}

.cv:hover {
  cursor: grab;
  cursor: -moz-grab;
  cursor: -webkit-grab;
}

.cv:active {
  cursor: grabbing;
  cursor: -moz-grabbing;
  cursor: -webkit-grabbing;
}

.mainDetails {
  padding: 25px 35px;
  border-bottom: 2px solid #066ccb;
  background: #f3f3f3;
}

#name h1 {
  font-size: 2.5em;
  font-family: "Gudea", Helvetica, arial, sans-serif;
}

#name h2 {
  font-size: 2em;
  font-family: "Gudea", Helvetica, arial, sans-serif;
}

#mainArea {
  padding: 0 40px;
}

/* I deeply love breakfast burritos */
.wrap {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.wrap:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

#headshot {
  width: 12.5%;
  float: left;
  margin-right: 30px;
}

#headshot img {
  width: 100%;
  height: auto;
  -webkit-border-radius: 50px;
  border-radius: 50px;
}

#name {
  float: left;
}

#contactDetails {
  float: right;
}

#contactDetails ul {
  list-style-type: none;
  font-size: 0.9em;
  margin-top: 2px;
}

#contactDetails ul li {
  margin-bottom: 3px;
  color: #444;
  display: inline;
}

#contactDetails ul li a,
a[href^="tel"] {
  color: #444;
  text-decoration: none;
  -webkit-transition: all 0.3s ease-in;
  -moz-transition: all 0.3s ease-in;
  -o-transition: all 0.3s ease-in;
  -ms-transition: all 0.3s ease-in;
  transition: all 0.3s ease-in;
}

#contactDetails ul li a:hover {
  color: #066ccb;
}

section {
  border-top: 1px solid #dedede;
  padding: 20px 0 20px;
}

section:first-child {
  border-top: 0;
}

section:last-child {
  padding: 20px 0 10px;
}

.sectionTitle {
  float: left;
  width: 25%;
}

.sectionContent {
  float: right;
  width: 72.5%;
}

.sectionTitle h1 {
  font-family: "Gudea", helvetica, arial, sans-serif;
  font-size: 1.1em;
  color: #066ccb;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.sectionContent h2 {
  font-family: "Gudea", helvetica, arial, sans-serif;
  font-size: 1.5em;
  margin-bottom: -2px;
}

.subDetails {
  font-size: 80%;
  margin-bottom: 3px;
}

.keySkills {
  list-style-type: none;
  -moz-column-count: 3;
  -webkit-column-count: 3;
  column-count: 3;
  margin-bottom: 20px;
  font-size: 1em;
  color: #444;
}

.keySkills ul li {
  margin-bottom: 3px;
}







@media all and (min-width: 602px) and (max-width: 800px) {
  #headshot {
    display: none;
  }

  .keySkills {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}





@media all and (max-width: 54rem) {
  .cv {
    width: 95%;
    margin: 10px auto;
    min-width: 280px;
    transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    -moz-transition: all 0.25s linear;
    -webkit-transition: all 0.25s linear;
  }

  #headshot {
    display: none;
  }

  #name,
  #contactDetails {
    float: none;
    width: 100%;
    text-align: center;
  }

  .sectionTitle,
  .sectionContent {
    float: none;
    width: 100%;
  }

  .sectionTitle {
    margin-left: -2px;
    font-size: 1.25em;
  }

  .keySkills {
    -moz-column-count: 2;
    -webkit-column-count: 2;
    column-count: 2;
  }
}

@media all and (max-width: 480px) {
  .mainDetails {
    padding: 15px 15px;
  }

  section {
    padding: 15px 0 0;
  }

  #mainArea {
    padding: 0 25px;
  }

  .keySkills {
    -moz-column-count: 1;
    -webkit-column-count: 1;
    column-count: 1;
  }

  #name h1 {
    line-height: 0.8em;
    margin-bottom: 4px;
  }
}

@media print {
  .cv {
    width: 100%;
  }
}









@-webkit-keyframes reset {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@-moz-keyframes reset {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@-moz-keyframes fade-in {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes reset {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  40% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.instaFade {
  -webkit-animation-name: reset, fade-in;
  -webkit-animation-duration: 1.5s;
  -webkit-animation-timing-function: ease-in;

  -moz-animation-name: reset, fade-in;
  -moz-animation-duration: 1.5s;
  -moz-animation-timing-function: ease-in;

  animation-name: reset, fade-in;
  animation-duration: 1.5s;
  animation-timing-function: ease-in;
}

.quickFade {
  -webkit-animation-name: reset, fade-in;
  -webkit-animation-duration: 2.5s;
  -webkit-animation-timing-function: ease-in;

  -moz-animation-name: reset, fade-in;
  -moz-animation-duration: 2.5s;
  -moz-animation-timing-function: ease-in;

  animation-name: reset, fade-in;
  animation-duration: 2.5s;
  animation-timing-function: ease-in;
}

.delayOne {
  -webkit-animation-delay: 0, 0.5s;
  -moz-animation-delay: 0, 0.5s;
  animation-delay: 0, 0.5s;
}

.delayTwo {
  -webkit-animation-delay: 0, 1s;
  -moz-animation-delay: 0, 1s;
  animation-delay: 0, 1s;
}

.delayThree {
  -webkit-animation-delay: 0, 1.5s;
  -moz-animation-delay: 0, 1.5s;
  animation-delay: 0, 1.5s;
}

.delayFour {
  -webkit-animation-delay: 0, 2s;
  -moz-animation-delay: 0, 2s;
  animation-delay: 0, 2s;
}

.delayFive {
  -webkit-animation-delay: 0, 2.5s;
  -moz-animation-delay: 0, 2.5s;
  animation-delay: 0, 2.5s;
}

</style>