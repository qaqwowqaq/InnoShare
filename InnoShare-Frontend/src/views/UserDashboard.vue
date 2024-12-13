<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <!-- 主卡片容器 -->
    <div class="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- 顶部背景横幅 -->
      <div class="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      <!-- 个人信息部分 -->
      <div class="relative px-4 sm:px-6 lg:px-8 pb-8">
        <!-- 头像 -->
        <div class="relative -mt-16 mb-8">
          <div class="relative">
            <img v-if="!isEditMode" 
                 :src="personalInfo.profileURL"
                 class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                 :alt="personalInfo.fullname"/>
            <el-upload v-else 
                      class="avatar-uploader"
                      :limit="1"
                      :show-file-list="false"
                      :before-upload="validateAvatarFile">
              <img :src="personalInfo.profileURL"
                   class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                   :alt="personalInfo.fullname"/>
            </el-upload>
          </div>
        </div>

        <!-- 编辑按钮 -->
        <div class="absolute top-4 right-4 space-x-2" v-if="isCurrentUser">
          <el-button @click="onEdit" 
                     class="!bg-blue-600 !text-white hover:!bg-blue-700 rounded-full">
            {{ editButtonText }}
          </el-button>
          <el-button v-if="isEditMode" 
                     @click="onConfirmEditting"
                     class="!bg-green-600 !text-white hover:!bg-green-700 rounded-full">
            保存修改
          </el-button>
        </div>

        <!-- 个人基本信息 -->
        <div class="text-center">
          <h1 class="text-3xl font-bold text-gray-900 mb-2">{{ personalInfo.fullname }}</h1>
          <div class="space-y-2">
            <div v-if="!isEditMode" class="text-gray-600">
              <p>@{{ personalInfo.username }}</p>
              <p>{{ personalInfo.email }}</p>
              <p>{{ personalInfo.phoneNumber }}</p>
            </div>
            <div v-else class="space-y-2 max-w-md mx-auto">
              <el-input v-model="personalInfo.username" placeholder="请输入用户名" class="!rounded-lg"/>
              <el-input v-model="personalInfo.email" placeholder="请输入电子邮箱" class="!rounded-lg"/>
              <el-input v-model="personalInfo.phoneNumber" placeholder="请输入手机号" class="!rounded-lg"/>
            </div>
          </div>
        </div>

        <!-- 认证状态 -->
        <div class="mt-8">
          <div class="flex items-center justify-between bg-gray-50 rounded-lg p-4">
            <div class="flex items-center space-x-2">
              <i class="el-icon-check text-green-500" v-if="personalInfo.isVerified"></i>
              <i class="el-icon-warning text-yellow-500" v-else></i>
              <span class="font-medium">认证状态</span>
            </div>
            <div>
              <span v-if="personalInfo.isVerified" class="text-green-500">已认证</span>
              <el-button v-else-if="isCurrentUser && !isEditMode" 
                        type="success" 
                        class="!rounded-full">
                去认证
              </el-button>
              <span v-else class="text-yellow-500">未认证</span>
            </div>
          </div>
        </div>

        <!-- 详细信息卡片组 -->
        <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <!-- 所属机构 -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">所属机构</h3>
            <div v-if="!isEditMode" class="text-gray-600">
              {{ personalInfo.institution }}
            </div>
            <el-input v-else v-model="personalInfo.institution" placeholder="请输入所属机构"/>
          </div>

          <!-- 国籍 -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h3 class="text-lg font-medium text-gray-900 mb-4">国籍</h3>
            <div v-if="!isEditMode" class="text-gray-600">
              {{ personalInfo.nationality }}
            </div>
            <el-input v-else v-model="personalInfo.nationality" placeholder="请输入国籍"/>
          </div>

          <!-- 研究领域 -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sm:col-span-2">
            <h3 class="text-lg font-medium text-gray-900 mb-4">研究领域</h3>
            <div v-if="!isEditMode" class="text-gray-600 whitespace-pre-line">
              {{ personalInfo.fieldOfStudy }}
            </div>
            <el-input v-else 
                      v-model="personalInfo.fieldOfStudy" 
                      type="textarea" 
                      placeholder="请输入研究领域"/>
          </div>

          <!-- 个人履历 -->
          <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sm:col-span-2">
            <h3 class="text-lg font-medium text-gray-900 mb-4">个人履历</h3>
            <div v-if="!isEditMode" class="text-gray-600 whitespace-pre-line">
              {{ personalInfo.experience }}
            </div>
            <el-input v-else 
                      v-model="personalInfo.experience" 
                      type="textarea" 
                      placeholder="请输入个人履历"/>
          </div>
        </div>

        <!-- 底部操作按钮 -->
        <div class="mt-8 flex justify-center space-x-4" v-if="!isEditMode">
          <el-button type="primary" class="!rounded-full">查看学术成果</el-button>
          <el-button v-if="isCurrentUser" 
                     type="primary"
                     class="!rounded-full">
            上传学术成果
          </el-button>
          <el-button v-if="isCurrentUser" 
                     @click="onShowInivitationCode"
                     class="!rounded-full">
            查看邀请码
          </el-button>
        </div>
      </div>
    </div>
  </div>

  <!-- 对话框保持不变 -->
  <el-dialog v-model="editSaveVisible" title="提示" width="500">
    <!-- 对话框内容保持不变 -->
  </el-dialog>

  <el-dialog v-model="copyInvitationCodeVisible" title="专属邀请码" width="500">
    <!-- 对话框内容保持不变 -->
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

<style>
/* 只保留必要的自定义样式 */
.avatar-uploader:hover {
  @apply opacity-80 cursor-pointer;
}

/* 添加一些过渡动效 */
.fade-enter-active,
.fade-leave-active {
  @apply transition-all duration-300;
}

.fade-enter-from,
.fade-leave-to {
  @apply opacity-0 transform scale-95;
}
</style>