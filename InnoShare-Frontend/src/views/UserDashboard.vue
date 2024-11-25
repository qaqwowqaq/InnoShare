<template>
  <div id="drag" class="cv instaFade wrap">
    <div class="mainDetails">
      <div id="editButton" class="quickFade delayThree" v-if="isCurrentUser">
        <el-button @click="editClick"> {{ editButtonText }} </el-button>
      </div>
      <div v-if="isCurrentUser && isEditMode">
        <el-button @click="confirmEdit"> 保存修改 </el-button>
      </div>
      <div id="headshot" class="">
        <img v-if="!isEditMode" :src="personalInfo.profileURL" :title="'Hi, I\'m ' + personalInfo.fullname + '!'" :alt="personalInfo.fullname" />
        <el-upload v-else :limit="1" :show-file-list="false" :before-upload="validateAvatarFile">
          <img :src="personalInfo.profileURL" :title="'Hi, I\'m ' + personalInfo.fullname + '!'" :alt="personalInfo.fullname" />
        </el-upload>
      </div>

      <div id="name">
        <h1 class="quickFade delayTwo">
          {{ personalInfo.fullname }}
        </h1>

        <h4 class="quickFade delayThree" v-if="!isEditMode">username: {{ personalInfo.username }}</h4>
        <h4 v-else>
          <el-input v-model="personalInfo.username" placeholder="请输入用户名"></el-input>
        </h4>
        <h4 class="quickFade delayThree" v-if="!isEditMode">email: {{ personalInfo.email }}</h4>
        <h4 v-else>
          <el-input v-model="personalInfo.email" placeholder="请输入电子邮箱"></el-input>
        </h4>
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
          <div v-if="personalInfo.isVerified">
            <h1>已认证</h1>
          </div>
          <div v-else>
            <article>
              <h1>未认证</h1>
            </article>
            <el-button v-if="isCurrentUser && !isEditMode">去认证</el-button>
          </div>
        </div>
        <div class="clear"></div>
      </section>
      <section>
        <article>
          <div class="sectionTitle">
            <h1>所属机构</h1>
          </div>

          <div class="sectionContent">
            <h3 v-if="!isEditMode">{{ personalInfo.institution }}</h3>
            <h3 v-else>
              <el-input v-model="personalInfo.institution" placeholder="请输入所属机构"></el-input>
            </h3>
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
            <h3 v-if="!isEditMode">{{ personalInfo.fieldOfStudy }}</h3>
            <h3 v-else>
              <el-input v-model="personalInfo.fieldOfStudy" type="textarea" placeholder="请输入研究领域"></el-input>
            </h3>
          </article>
        </div>
        <div class="clear"></div>
      </section>

      <section>
        <div class="sectionTitle">
          <h1>个人履历</h1>
        </div>

        <div class="sectionContent">
          <article>
            <h3 v-if="!isEditMode">{{ personalInfo.experience }}</h3>
            <h3 v-else>
              <el-input v-model="personalInfo.experience" placeholder="请输入个人履历" type="textarea"></el-input>
            </h3>
          </article>
        </div>
        <div class="clear"></div>
      </section>

      <section>
        <div class="sectionTitle">
          <h1>学术成果</h1>
        </div>

        <div class="sectionContent">
          <el-button v-if="!isEditMode">查看学术成果</el-button>
          <el-button v-if="!isEditMode">上传学术成果</el-button>
        </div>
        <div class="clear"></div>
      </section>
    </div>
  </div>
  <el-dialog v-model="editSaveVisible" title="Tips" width="500">
    <span>是否需要保存当前修改？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancelEdit">不保存</el-button>
        <el-button type="primary" @click="confirmEdit">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useRouter } from 'vue-router';

// information of user
class PersonInfo {
  username: string = 'PlutoFX';
  fullname: string = 'Ibuki Ayapa';
  email: string = 'example@gmail.com';
  // 是否已认证
  isVerified: boolean = false;
  profileURL: string = 'https://th.bing.com/th/id/OIP.EyNjv0tcjuB_E5RFnPrw3wAAAA?w=203&h=145&c=7&r=0&o=5&dpr=1.5&pid=1.7';
  institution: string = 'Beihang University';
  experience: string = 'Working / Studying Experience';
  fieldOfStudy: string = 'Software Engineer';
  // username: string, fullname: string, email: string, isVerified: boolean,
  // profileURL: string, institution: string, experience: string, fieldOfStudy: string
  constructor(other?: PersonInfo) {
    if (other !== undefined) {
      this.deepClone(other);
    }
  }

  deepClone(other: PersonInfo) {
      this.username = other.username;
      this.fullname = other.fullname;
      this.email = other.email;
      this.isVerified = other.isVerified;
      this.profileURL = other.profileURL;
      this.institution = other.institution;
      this.experience = other.experience;
      this.fieldOfStudy = other.fieldOfStudy;
  }
}

const personalInfo = reactive(new PersonInfo());
const backedPersonalInfo = reactive(new PersonInfo());
// const username = ref('PlutoFX');
// const fullname = ref('Ibuki Ayapa');
// const email = ref('exaple@gmail.com');
// const isAuthenticated = ref(false);
// const profileURL = ref('https://th.bing.com/th/id/OIP.EyNjv0tcjuB_E5RFnPrw3wAAAA?w=203&h=145&c=7&r=0&o=5&dpr=1.5&pid=1.7');
// const institution = ref('Beihang University');
// const experience = ref('Working / Studying Experience');
// const fieldOfStudy = ref('Software Engineer');

const formData = ref(new FormData());



// logic of controlling
const isCurrentUser = computed(() => {
  return true;
})
const isEditMode = ref(false);

// 编辑时，确认是否需要保存的提示窗
const editSaveVisible = ref(false);

// static information for web page
const editButtonText = computed(() => {
  if (isEditMode.value) {
    return '退出编辑'
  } else {
    return '编辑个人信息'
  }
})

// functions
const editClick = (): void => {
  if (isEditMode.value) {
    // true, check if we need to save
    editSaveVisible.value = true;
  } else {
    isEditMode.value = true;
    editSave();
  }
}

const editSave = (): void => {
  // all information backed up
  backedPersonalInfo.deepClone(personalInfo);
  // todo: send update request
}

const cancelEdit = () => {
  // todo: recover backed up info
  personalInfo.deepClone(backedPersonalInfo);
  isEditMode.value = false;
  editSaveVisible.value = false;
}

const confirmEdit = () => {
  // send the edit request
  ElMessage({
    message: "个人信息修改成功！",
    type: "success",
  });
  isEditMode.value = false;
  editSaveVisible.value = false;
}

const validateAvatarFile: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('上传图像必须是JPG / PNG格式');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图像文件不能超过2MB');
    return false;
  }
  personalInfo.profileURL = URL.createObjectURL(rawFile);

  // Do not upload to server, but add to the file list while confirming editting
  return false;
}

// request function


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
  font-feature-settings: "calt", "liga", "hist", "onum", "pnum";
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

#editButton {
  padding: 1%;
  margin: 1%;
}

#headshot {
  width: 15%;
  float: left;
  margin-right: 30px;
  overflow: hidden;
  position: relative;

}

#headshot img {
  width: 100%;
  aspect-ratio: 3 / 4;
  border: 1px solid #066ccb;
  object-fit: cover;
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