<template>
  <div id="drag" class="cv instaFade wrap">
    <div class="mainDetails">
      <div id="editButton" class="quickFade delayThree" v-if="isCurrentUser">
        <el-button @click="onEdit" type="primary"> {{ editButtonText }} </el-button>
      </div>
      <div v-if="isCurrentUser && isEditMode">
        <el-button @click="onConfirmEditting" type="success"> 保存修改 </el-button>
      </div>
      <div id="headshot">
        <img v-if="!isEditMode" :src="personalInfo.profileURL" :title="'Hi, I\'m ' + personalInfo.fullname + '!'"
          :alt="personalInfo.fullname" />
        <el-upload v-else :limit="1" :show-file-list="false" :before-upload="validateAvatarFile">
          <img :src="personalInfo.profileURL" :title="'Hi, I\'m ' + personalInfo.fullname + '!'"
            :alt="personalInfo.fullname" />
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
        <h4 class="quickFade delayThree" v-if="!isEditMode">email: {{ personalInfo.phoneNumber }}</h4>
        <h4 v-else>
          <el-input v-model="personalInfo.phoneNumber" placeholder="请输入手机号"></el-input>
        </h4>
        <h4 class="quickFade delayThree" v-if="!isEditMode">email: {{ personalInfo.email }}</h4>
        <h4 v-else>
          <el-input v-model="personalInfo.email" placeholder="请输入电子邮箱"></el-input>
        </h4>
      </div>
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
            <article class="flex-container">
              <h1>未认证</h1>
              <el-button v-if="isCurrentUser && !isEditMode" type="success" round>去认证</el-button>
            </article>
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
        <article>
          <div class="sectionTitle">
            <h1>国籍</h1>
          </div>

          <div class="sectionContent">
            <h3 v-if="!isEditMode">{{ personalInfo.nationality }}</h3>
            <h3 v-else>
              <el-input v-model="personalInfo.nationality" placeholder="请输入国籍"></el-input>
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

      <section v-if="!isEditMode">
        <div class="sectionTitle">
          <h1>学术成果</h1>
        </div>

        <div class="sectionContent">
          <el-button type="primary">查看学术成果</el-button>
          <el-button v-if="isCurrentUser" type="primary">上传学术成果</el-button>
        </div>
        <div class="clear"></div>
      </section>

      <section v-if="!isEditMode && isCurrentUser">
        <div class="sectionTitle">
          <h1>专属邀请码</h1>
        </div>
        <div class="sectionContent">
          <el-button @click="onShowInivitationCode" type="primary">查看邀请码</el-button>
        </div>
      </section>
    </div>
  </div>

  <el-dialog v-model="editSaveVisible" title="Tips" width="500">
    <span>是否需要保存当前修改？</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancelEdit" type="danger">不保存</el-button>
        <el-button type="primary" @click="onConfirmEditting">
          保存
        </el-button>
      </div>
    </template>
  </el-dialog>

  <el-dialog v-model="copyInvitationCodeVisible" title="Tips" width="500">
    <span>{{ personalInfo.fullname }}的专属邀请码:</span>
    <br />
    <span>{{ personalInfo.inivitationCode }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCopyInvitaitionCode" type="primary">复制到剪切板</el-button>
        <el-button @click="onCloseInvitationCodeDialog">关闭窗口</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue';
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useRouter } from 'vue-router';
import { useUserStore } from '../store/modules/user';

const userStore = useUserStore();
// information of user
class PersonInfo {
  username: string = 'PlutoFX';
  fullname: string = 'Ibuki Ayapa';
  phoneNumber: string = '11122223333';
  email: string = 'example@gmail.com';
  // 是否已认证
  isVerified: boolean = false;
  profileURL: string = 'https://th.bing.com/th/id/OIP.EyNjv0tcjuB_E5RFnPrw3wAAAA?w=203&h=145&c=7&r=0&o=5&dpr=1.5&pid=1.7';
  nationality: string = 'China';
  institution: string = 'Beihang University';
  experience: string = 'Working / Studying Experience';
  fieldOfStudy: string = 'Software Engineer';
  inivitationCode: string = 'f1i6VJzl8MlUVNO7uVRCDmMWvCfWX8Ed';
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
    this.phoneNumber = other.phoneNumber;
    this.email = other.email;
    this.isVerified = other.isVerified;
    this.profileURL = other.profileURL;
    this.nationality = other.nationality;
    this.institution = other.institution;
    this.experience = other.experience;
    this.fieldOfStudy = other.fieldOfStudy;
  }
}

const personalInfo = reactive(new PersonInfo());
const backedPersonalInfo = reactive(new PersonInfo());


const formData = reactive(new FormData());



/* logic of controlling */

// 为了展示静态逻辑，暂时先默认为true
const isCurrentUser = computed(() => {
  // return userStore.userInfo?.username == personalInfo.username;
  return true;
})
const isEditMode = ref(false);
const copyInvitationCodeVisible = ref(false);

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
const onEdit = (): void => {
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

const onCancelEdit = (): void => {
  personalInfo.deepClone(backedPersonalInfo);
  isEditMode.value = false;
  editSaveVisible.value = false;
}

const onConfirmEditting = (): void => {
  // send the edit request
  ElMessage({
    message: "个人信息修改成功！",
    type: "success",
  });
  isEditMode.value = false;
  editSaveVisible.value = false;
}

const validateAvatarFile: UploadProps['beforeUpload'] = (rawFile): boolean => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage.error('上传图像必须是JPG / PNG格式');
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage.error('图像文件不能超过2MB');
    return false;
  }
  personalInfo.profileURL = URL.createObjectURL(rawFile);

  //  todo: Do not upload to server, but add to the file list while confirming editting
  return false;
}

const onCopy = (text: string): void => {
  navigator.clipboard.writeText(text).then(
    () => {
      // success
      ElMessage.success('邀请码复制成功');
    },
    () => {
      // fail
      ElMessage.error('邀请码复制失败，请检查剪切板写入权限');
    }
  );
}

const onShowInivitationCode = (): void => {
  copyInvitationCodeVisible.value = true;
}

const onCloseInvitationCodeDialog = (): void => {
  copyInvitationCodeVisible.value = false;
}

const onCopyInvitaitionCode = (): void => {
  onCopy(personalInfo.inivitationCode);
}

// todo: request function


</script>

<style scoped>
#drag {
  position: relative;
  padding-bottom: 200px;
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
  /* max-width: 80%; */
  padding-top: 20px;
  max-width: 60rem;
  background: #fff;
  margin: 100px auto;
}

.mainDetails {
  padding: 25px 35px;
  border-bottom: 2px solid #066ccb;
  background: #ffffff;
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
  margin-top: 30px;
  margin-right: 50px;
  overflow: hidden;
  position: relative;

}

#headshot img {
  width: 90%;
  aspect-ratio: 3 / 4;
  border: 1px solid #066ccb;
  position: relative;
  object-fit: cover;
}

#name {
  float: left;
}

section {
  border-top: 1px solid #066ccb;
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

/* .dialog-footer {
  padding-top: 200px auto;
} */




@media all and (min-width: 602px) and (max-width: 800px) {
  #headshot {
    display: none;
  }
}





@media all and (max-width: 60rem) {
  .cv {
    width: 95%;
    margin: 30px auto;
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