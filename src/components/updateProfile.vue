<template>
  <div class="title">
    <p>{{ greeting }}</p>
    <p>Update your personal health tracker</p>
  </div>

  <div class="subtitle">
    <p>Start updating your height and weight</p>
  </div>

  <div class="container1">
    <p id="height-label">Height:</p>
    <div class="height-field">
      <input
        class="query-input"
        placeholder="Height"
        type="number"
        v-model="height"
        required
      />
    </div>
    <p id="height-unit">cm</p>
  </div>

  <div class="container2">
    <p id="weight-label">Weight:</p>
    <div class="weight-field">
      <input
        class="query-input"
        placeholder="Weight"
        type="number"
        v-model="weight"
        required
      />
    </div>
    <p id="weight-unit">kg</p>
  </div>

  <div class="confirm-button-wrapper">
    <button id="confirm-button" @click="updateProfile">Confirm</button>
  </div>

  <div class="cancel-button-wrapper">
    <button id="cancel-button" @click="home">Cancel</button>
  </div>

  <img class="image" src="../assets/welcome.png" alt="image here" />
</template>

<script>
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/firebase.js'
import { mapActions } from 'vuex'

export default {
  name: 'updateProfileComponent',
  data() {
    return {
      height: null,
      weight: null,
      username: null,
    }
  },

  async mounted() {
    const user = auth.currentUser
    if (user) {
      const profileDocRef = doc(db, 'users', user.uid)
      const profileDoc = await getDoc(profileDocRef)
      if (profileDoc.exists()) {
        const profileData = profileDoc.data()
        if (profileData.profile_info) {
          this.username = profileData.profile_info.username
        }
      }
    }
  },

  computed: {
    greeting() {
      if (this.username) {
        return `Hello, ${this.username}!`
      } else {
        return 'Loading...'
      }
    },
  },
  methods: {
    home() {
      this.$router.push('/home')
    },
    async updateProfile() {
      const user = auth.currentUser
      if (user) {
        this.uid = user.uid

        // fetch the previous weight data of the user
        const userRef = doc(db, 'users', this.uid)
        const userSnapshot = await getDoc(userRef)
        const healthStats = userSnapshot.data().healthStats
        const prevWeight = healthStats.weight
        this.updatePreviousWeight(prevWeight)

        // update the health stats
        await updateDoc(userRef, {
          'healthStats.height': this.height,
          'healthStats.weight': this.weight,
        })
        alert('Profile updated successfully!')
        this.$router.push('/home')
      }
    },
    ...mapActions(['updatePreviousWeight']),
  },
}
</script>

<style scoped>
input {
  box-sizing: border-box;

  position: absolute;
  width: 335px;
  height: 48px;
  left: 650px;
  top: 200px;

  border-radius: 40px;

  background: #fffefe;
  border: 1.50794px solid #000000;

  transform: matrix(1, 0, 0, 1, 0, 0);
}

.query-input::placeholder {
  text-indent: 30px;
  font-family: 'Mulish';
  font-size: 16px;
  color: #b5b7b9;
}

.image {
  display: block;
  width: 220px;
  height: 330px;
  position: absolute;
  top: 300px;
  left: 400px;
}

.title {
  position: absolute;
  width: 953.85px;
  height: 118px;
  left: 300px;
  /* top: 79px; */

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 36px;

  color: #061428;

  transform: rotate(0.07deg);
}

.subtitle {
  /* Give us some basic information to get started */
  position: absolute;
  width: 736.17px;
  height: 42px;
  left: 300px;
  top: 150px;

  font-family: 'DM Sans';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 10px;
  /* identical to box height */

  /* bl */
  color: #061428;

  transform: rotate(0.04deg);
}
.container1 {
  display: flex;
}

.container2 {
  display: flex;
}

.height-field {
  position: absolute;
  top: 200px;
  left: 240px;
}

#height-label {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 750px;
  top: 370px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;

  color: #a88151;
}

#weight-label {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 750px;
  top: 450px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;

  color: #a88151;
}

#height-unit {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 1250px;
  top: 370px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;

  color: #a88151;
}

#weight-unit {
  position: absolute;
  width: 149px;
  height: 41px;
  left: 1250px;
  top: 450px;

  font-family: 'Mulish';
  font-style: normal;
  font-weight: 600;
  font-size: 30px;
  line-height: 20px;
  /* or 63% */
  display: flex;
  align-items: center;

  color: #a88151;
}

.height-field #height {
  position: absolute;
  top: -5px;
  left: 40px;
  font-family: 'Mulish';
  font-style: normal;
  font-size: 18px;
  color: #b5b7b9;
  text-align: center;
}

.weight-field {
  position: absolute;
  top: 280px;
  left: 240px;
}

.weight-field #weight {
  position: absolute;
  top: -5px;
  left: 40px;
  font-family: 'Mulish';
  font-style: normal;
  font-size: 18px;
  color: #b5b7b9;
  text-align: center;
}

.confirm-button-wrapper {
  position: absolute;
  left: 800px;
  top: 580px;

  width: 700px;
  height: 50px;
}

.confirm-button-wrapper #confirm-button {
  width: 168.3px;
  height: 44.59px;

  font-family: 'Mulish';
  font-style: normal;
  font-size: 20px;
  text-align: center;
  color: #746652;

  background: #ddd8ba;
  border-radius: 30px;
}

.cancel-button-wrapper {
  position: absolute;
  left: 1000px;
  top: 580px;

  width: 700px;
  height: 50px;
}

.cancel-button-wrapper #cancel-button {
  width: 168.3px;
  height: 44.59px;

  font-family: 'Mulish';
  font-style: normal;
  font-size: 20px;
  text-align: center;
  color: #746652;

  background: #ddd8ba;
  border-radius: 30px;
}
</style>
