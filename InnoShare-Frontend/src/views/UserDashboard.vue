<template>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
  <div class="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
    <!-- 主卡片容器 -->
    <div class="max-w-4xl mt-10 mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- 顶部背景横幅 -->
      <div class="h-32 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
      
      <!-- 个人信息部分 -->
      <div class="relative px-4 sm:px-6 lg:px-8 pb-8">
        <!-- 头像 -->
        <div class="relative -mt-16 mb-8">
          <div class="relative">
            <img v-if="!isEditMode" 
                 :src="personalInfo.profileURL"
                 @error="onImageError"
                 class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                 :alt="personalInfo.fullname"/>
            <el-upload v-else 
                      class="avatar-uploader"
                      :limit="1"
                      :show-file-list="false"
                      :before-upload="validateAndUpdateAvatarFile">
              <img :src="personalInfo.profileURL"
                   class="w-32 h-32 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                   :alt="personalInfo.fullname"/>
            </el-upload>
          </div>
        </div>

        <!-- 编辑按钮 -->
        <div class="absolute top-4 right-4 space-x-2" v-if="isCurrentUser && personalInfo.isVerified == 1">
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
              <p>@{{ personalInfo.username }}</p>
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
              <span v-if="personalInfo.isVerified == 1" class="text-green-500">已认证</span>
              <span v-else-if="personalInfo.isVerified == 0" class="text-yellow-500">未认证</span>
              <span v-else-if="personalInfo.isVerified == 2" class="text-yellow-500">待审核</span>
              <el-button v-if="personalInfo.isVerified == 0 && isCurrentUser && !isEditMode" 
                        type="success" 
                        class="!rounded-full"
                        @click="routerToVerify">
                去认证
              </el-button>
              
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
          <el-button type="primary" class="!rounded-full" @click="routerToAchivementList">查看学术成果</el-button>
          <el-button v-if="isCurrentUser" 
                     type="primary"
                     class="!rounded-full"
                     @click="routerToUploadingAchivementList">
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

  <el-dialog v-model="copyInvitationCodeVisible" title="专属邀请码" width="500">
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
import { computed, reactive, ref, onMounted } from 'vue';
import { ElMessage } from 'element-plus'
import type { UploadProps } from 'element-plus'
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '../store/modules/user';
import axiosInstance from '@/axiosConfig';

const route = useRoute();
const router = useRouter();

const userStore = useUserStore();
const userId: string = Array.isArray(route.params.userId) ? route.params.userId[0] : route.params.userId;

// information of user
class PersonInfo {
  username: string = 'PlutoFX';
  fullname: string = 'Ibuki Ayapa';
  phoneNumber: string = '11122223333';
  email: string = 'example@gmail.com';
  // 是否已认证
  isVerified: number = 2;
  profileURL: string = 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png';
  nationality: string = 'China';
  institution: string = 'Beihang University';
  experience: string = 'Working / Studying Experience';
  fieldOfStudy: string = 'Software Engineer';
  inivitationCode: string = 'f1i6VJzl8MlUVNO7uVRCDmMWvCfWX8Ed';

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

class UpdatableInfo {
  fullName: string = "PPP";
  phoneNumber: string = '11122223333';
  email: string = 'example@gmail.com';
  nationality: string = 'China';
  institution: string = 'Beihang University';
  experience: string = 'Working / Studying Experience';
  fieldOfStudy: string = 'Software Engineer';
}
const personalInfo2UpdatableInfo = (other: PersonInfo): UpdatableInfo => {
  const updatableInfo: UpdatableInfo = new UpdatableInfo();
  updatableInfo.fullName = other.fullname;
  updatableInfo.phoneNumber = other.phoneNumber;
  updatableInfo.email = other.email;
  updatableInfo.nationality = other.nationality;
  updatableInfo.institution = other.institution;
  updatableInfo.experience = other.experience;
  updatableInfo.fieldOfStudy = other.fieldOfStudy;
  return updatableInfo;
}

const personalInfo = reactive(new PersonInfo());
const backedPersonalInfo = reactive(new PersonInfo());


const formData = reactive(new FormData());



/* logic of controlling */
onMounted(() => {
  getUserDetails(userId).then((result) => {
    console.log(result.data);
    const resultData = result.data;
    personalInfo.username = resultData.username;
    personalInfo.email = resultData.email;
    personalInfo.phoneNumber = resultData.phoneNumber;
    personalInfo.fullname = resultData.fullName;
    personalInfo.institution = resultData.institution;
    personalInfo.nationality = resultData.nationality;
    personalInfo.fieldOfStudy = resultData.fieldOfStudy;
    personalInfo.experience = resultData.experience;
    personalInfo.isVerified = resultData.isVerified;
  personalInfo.profileURL = resultData.avatarURL;
  }).catch(() => {
    // not sure
    ElMessage({
      message: "获取用户信息失败",
      type: "error",
      offset: 100
    })
  })
});


// 为了展示静态逻辑，暂时先默认为true
const isCurrentUser = computed(() => {
  console.log(userStore.userInfo?.username);
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
const onImageError = (event: Event): void => {
  const target = event.target as HTMLImageElement;
  target.src = 'https://img.51miz.com/Element/00/88/08/84/72f298b9_E880884_d0f63115.png';
}

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
}

const onCancelEdit = (): void => {
  personalInfo.deepClone(backedPersonalInfo);
  isEditMode.value = false;
  editSaveVisible.value = false;
}

const onConfirmEditting = (): void => {
  // send the edit request
  updateUserDetails(personalInfo2UpdatableInfo(personalInfo)).then((result) => {
    console.log(result.message)
      ElMessage({
        message: "个人信息修改成功！",
        type: "success",
        offset: 100
      });
      isEditMode.value = false;
      editSaveVisible.value = false;
    }
  ).catch((error) => {
    // personalInfo.deepClone(backedPersonalInfo);
    ElMessage({
      message: "个人信息修改失败，请检查控制台",
      type: "error",
      offset: 100
    });
  });
  
}

// validate and update
const validateAndUpdateAvatarFile: UploadProps['beforeUpload'] = (rawFile): boolean => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png') {
    ElMessage({
      message: "上传图像必须是JPG / PNG格式",
      type: "error",
      offset: 100
    });
    return false;
  } else if (rawFile.size / 1024 / 1024 > 2) {
    ElMessage({
      message: "图像文件不能超过2MB",
      type: "error",
      offset: 100
    });
    return false;
  }
  // personalInfo.profileURL = URL.createObjectURL(rawFile);

  // request
  updateUserAvatar(rawFile).then(
    (result) => {
      console.log(result);
      personalInfo.profileURL = result.avatarURL
      ElMessage({
        message: "头像上传成功！",
        type: "success",
        offset: 100,
      });
    }
  ).catch((error) => {
    ElMessage({
      message: "头像上传失败，请检查控制台",
      type: "error",
      offset: 100,
    });
  })
  return false;
}

const onCopy = (text: string): void => {
  navigator.clipboard.writeText(text).then(
    () => {
      // success
    ElMessage({
      message: "邀请码复制成功",
      type: "success",
      offset: 100,
    })
    },
    () => {
      // fail
    ElMessage({
      message: "邀请码复制失败，请检查剪切板写入权限",
      type: "error",
      offset: 100,
    })
  },
  );
}

const onShowInivitationCode = (): void => {
  getInvitationCode().then((result) => {
    personalInfo.inivitationCode = result.data;
    copyInvitationCodeVisible.value = true;
  }).catch((error) => {
    ElMessage({
      message: "邀请码获取失败",
      type: "error",
      offset: 100,
    })
  })
}

const onCloseInvitationCodeDialog = (): void => {
  copyInvitationCodeVisible.value = false;
}

const onCopyInvitaitionCode = (): void => {
  onCopy(personalInfo.inivitationCode);
}

const routerToAchivementList = (): void => {
  router.push(`/AchiManage/${userId}`)
}

const routerToUploadingAchivementList = (): void => {
  router.push(`/UploadPaper`)
}

const routerToVerify = (): void => {
  router.push(`/verify`)
}

// request function
const urlBase : string = '/users'

// 获取指定用户详细信息
const getUserDetails = async (userId: string) => {
  try {
    const response = await axiosInstance.get(`${urlBase}/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
}

// 更新用户信息
const updateUserDetails = async (infoToUpdate: UpdatableInfo) => {
  try {
    /*
      {
      fullName: personalInfo.fullname,
      email: personalInfo.email,
      phoneNumber: personalInfo.phoneNumber,
      fieldOfStudy: personalInfo.fieldOfStudy,
      institution: personalInfo.institution,
      nationality: personalInfo.nationality,
      experience: personalInfo.experience,
    }
     */
    const response = await axiosInstance.post(`${urlBase}/update`, infoToUpdate, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating user details:', error);
    throw error;
  }
}

// 更新用户头像
const updateUserAvatar = async (avatarFile: File) => {
  try {
    formData.append('avatar', avatarFile);
    const response = await axiosInstance.post(`${urlBase}/updateAvatar`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating user avatar:', error);
    throw error;
  }
}

// 生成专属邀请码
const getInvitationCode = async () => {
  try {
    const response = await axiosInstance.get(`${urlBase}/invite`);
    return response.data;
  } catch (error) {
    console.error('Error fetching invitation code:', error);
    throw error;
  }
}
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