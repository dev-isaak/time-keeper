<script setup>
import { useFirestoreDB } from '@/stores/firestoreDB.js'
import SettingRow from '@/components/account-settings/SettingRow.vue'
import ProfileAvatar from '@/components/ProfileAvatar.vue'
import { ref } from 'vue'
import SnackBar from '../SnackBar.vue'


const db = useFirestoreDB()
const updatedUserName = ref('')
const updatedUserLastname = ref('')
const updatedUserAddress = ref('')
const updatedUserBirthDate = ref('')
const updatedUserPhone = ref('')
const closeEditingView = ref(false)
const message = ref('')
const openSnackbar = ref(false)

const handleUpdateUsername = async () => {
  await db.updateUserName(updatedUserName.value)
  if (db.isUserNameUpdated) {
    closeEditingView.value = true
    message.value = 'User name updated succesfully.'
    openSnackbar.value = true
    setTimeout(() => {
        openSnackbar.value = false
    }, 3000)
  }
}
const handleUpdateLastname = async () => {
  await db.updateUserLastname(updatedUserLastname.value)
  if (db.isUserLastnameUpdated) {
    closeEditingView.value = true
        message.value = 'Last name updated succesfully.'
    openSnackbar.value = true
    setTimeout(() => {
        openSnackbar.value = false
    }, 3000)
  }
}
const handleUpdateBirthDate = async () => {
  await db.updateUserBirthDate(updatedUserBirthDate.value)
  if (db.isUserBirthDateUpdated) {
    closeEditingView.value = true
    message.value = 'Birth date updated succesfully.'
    openSnackbar.value = true
    setTimeout(() => {
        openSnackbar.value = false
    }, 3000)
  }
}
const handleUpdateAddress = async () => {
  await db.updateUserAddress(updatedUserAddress.value)
  if (db.isUserAddressUpdated) {
    closeEditingView.value = true
    message.value = 'Address updated succesfully.'
    openSnackbar.value = true
    setTimeout(() => {
        openSnackbar.value = false
    }, 3000)
  }
}
const handleUpdatePhone = async () => {
  await db.updateUserPhone(updatedUserPhone.value)
  if (db.isUserPhoneUpdated) {
    closeEditingView.value = true
    message.value = 'Phone number updated succesfully.'
    openSnackbar.value = true
    setTimeout(() => {
        openSnackbar.value = false
    }, 3000)
  }
}
//Received values from text field at SettingRow component
const receivedUserName = (userName) => (updatedUserName.value = userName)
const receivedLastname = (lastName) => (updatedUserLastname.value = lastName)
const receivedBirthDate = (birthDate) => (updatedUserBirthDate.value = birthDate)
const receivedAddress = (address) => (updatedUserAddress.value = address)
const receivedPhone = (phoneNumber) => (updatedUserPhone.value = phoneNumber)

</script>

<template>
<SnackBar :text="message" :openSnackbar="openSnackbar"/>
<h3 class="mt-10 mb-2">Profile Info</h3>
      <v-container cols="1" class="border py-10">
        <v-row>
          <v-col cols="12" md="2">
            <v-sheet>
              <v-sheet class="d-flex flex-column align-center w-100" width="100">
                <ProfileAvatar size="150" class="mb-4"/>
                <!--<PrimaryButton text="Edit" />-->
              </v-sheet>
            </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="d-flex flex-wrap justify-center">
              <SettingRow
                title="Name"
                :value="db.currentUserName"
                :updateValue="handleUpdateUsername"
                @fieldValue="receivedUserName"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Last Name"
                :value="db.currentUserLastname"
                :updateValue="handleUpdateLastname"
                @fieldValue="receivedLastname"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Birth Date"
                :value="db.currentUserBirthDate"
                :updateValue="handleUpdateBirthDate"
                @fieldValue="receivedBirthDate"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Address"
                :value="db.currentUserAddress"
                :updateValue="handleUpdateAddress"
                @fieldValue="receivedAddress"
                :closeEditingView="closeEditingView"
              />
              <SettingRow
                title="Phone Number"
                :value="db.currentUserPhone"
                :updateValue="handleUpdatePhone"
                @fieldValue="receivedPhone"
                :closeEditingView="closeEditingView"
              />
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>