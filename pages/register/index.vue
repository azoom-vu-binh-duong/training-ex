<template>
  <div class="register-page">
    <div class="form-container">
      <h3 id="title">Registration Form</h3>
      <form class="form" @submit.prevent="submit">
        <div class="row-item">
          <div class="form-item">
            <label class="form-label">Email</label>
            <input v-model.trim="$v.email.$model" class="form-input" />
            <div
              v-if="$v.email.$error && $v.email.$dirty"
              class="error-container"
            >
              <div v-if="!$v.email.required" class="error">
                Email is required
              </div>
              <div v-if="!$v.email.email" class="error">Email not valid</div>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">Password</label>
            <input v-model.trim="$v.password.$model" class="form-input" />
            <div
              v-if="$v.password.$error && $v.password.$dirty"
              class="error-container"
            >
              <div v-if="!$v.password.required" class="error">
                Password is required
              </div>
              <div v-if="!$v.password.minLength" class="error">
                Password must have at least
                {{ $v.password.$params.minLength.min }} characters
              </div>
              <div
                v-if="!$v.password.oneSpecialCharacter && $v.password.$dirty"
                class="error"
              >
                Password must have at least 1 special character
              </div>
              <div
                v-if="!$v.password.oneUppercaseCharacter && $v.password.$dirty"
                class="error"
              >
                Password must have at least 1 uppercase character
              </div>
              <div
                v-if="!$v.password.oneNumberCharacter && $v.password.$dirty"
                class="error"
              >
                Password must have at least 1 number character
              </div>
              <div
                v-if="!$v.password.oneLowercaseCharacter && $v.password.$dirty"
                class="error"
              >
                Password must have at least 1 lowercase character
              </div>
            </div>
          </div>
        </div>

        <div class="row-item">
          <div class="form-item">
            <label class="form-label">Name</label>
            <input v-model.trim="$v.name.$model" class="form-input" />
            <div
              v-if="$v.name.$error && $v.name.$dirty"
              class="error-container"
            >
              <div v-if="!$v.name.required" class="error">Name is required</div>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">Gender</label>
            <select v-model="gender" class="form-input -borderless">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>
        </div>

        <div class="row-item">
          <div class="form-item">
            <label class="form-label">Date of Birth</label>
            <input
              v-model.trim="$v.birthDate.$model"
              class="form-input"
              type="date"
            />
            <div
              v-if="$v.birthDate.$error && $v.birthDate.$dirty"
              class="error-container"
            >
              <div v-if="!$v.birthDate.required" class="error">
                Date of Birth is required
              </div>
              <div v-if="!$v.birthDate.validDate" class="error">
                Not valid date
              </div>
            </div>
          </div>

          <div class="form-item">
            <label class="form-label">Graduation Date</label>
            <input
              v-model.trim="$v.graduationDate.$model"
              class="form-input"
              type="date"
            />
            <div
              v-if="$v.graduationDate.$error && $v.graduationDate.$dirty"
              class="error-container"
            >
              <div v-if="!$v.graduationDate.validGraduationDate" class="error">
                Not valid graduation date
              </div>
            </div>
          </div>
        </div>

        <div class="row-item">
          <div class="form-item">
            <label class="form-label">Address</label>
            <textarea v-model="address" class="form-input" />
          </div>

          <div class="form-item">
            <label class="form-label">Phone</label>
            <input v-model.trim="$v.phone.$model" class="form-input" />
            <div
              v-if="$v.phone.$error && $v.phone.$dirty"
              class="error-container"
            >
              <div v-if="!$v.phone.required" class="error">
                Phone is required
              </div>
              <div v-if="!$v.phone.validPhoneNumber" class="error">
                Not valid phone number
              </div>
            </div>
          </div>
        </div>

        <button
          class="btn"
          type="submit"
          :disabled="submitStatus === 'PENDING'"
        >
          Submit
        </button>
        <button class="btn -back-btn" @click.prevent="$router.go(-1)">
          Back
        </button>
        <div v-if="$v.phone.$error && $v.phone.$dirty" class="error-container">
          <div v-if="submitStatus === 'ERROR'" class="error">
            Please fill the form correctly.
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
  
  <script>
import { email, minLength, required } from 'vuelidate/lib/validators'

export default {
  layout: 'gray-layout',
  data() {
    return {
      email: '',
      password: '',
      name: '',
      gender: '',
      birthDate: '',
      graduationDate: '',
      phone: '',
      address: '',
      submitStatus: '',
    }
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
      oneLowercaseCharacter: (value) => {
        const regex = /.*[a-z].*/
        return regex.test(value)
      },
      oneUppercaseCharacter: (value) => {
        const regex = /.*[A-Z].*/
        return regex.test(value)
      },
      oneNumberCharacter: (value) => {
        const regex = /.*[0-9].*/
        return regex.test(value)
      },
      oneSpecialCharacter: (value) => {
        const regex = /.*[#?!@$%^&*-].*/
        return regex.test(value)
      },
    },
    name: {
      required,
    },
    phone: {
      required,
      validPhoneNumber: (value) => {
        const regex = /^[0-9\+]{9,15}$/ //eslint-disable-line
        return regex.test(value)
      },
    },
    birthDate: {
      required,
      validDate: (value) => {
        return new Date(value.toString()) < new Date()
      },
    },
    graduationDate: {
      required,
      validGraduationDate: (value, vm) => {
        if (!vm.birthDate) return true
        return new Date(value.toString()) > new Date(vm.birthDate.toString())
      },
    },
  },
  methods: {
    submit() {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        alert('Chuẩn form luôn')
      }
    },
  },
}
</script>
  
<style lang="scss" scoped>
@import '~/assets/style/color.scss';
.form-container {
  margin: auto;
  width: 700px;
  border-radius: 20px;
  padding: 30px 50px;
  background-color: #252525;
  color: $main-orange;
  box-shadow: 0px 0px 15px $main-orange;
  > #title {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: 500;
  }
}

.form {
  > .row-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    > .form-item {
      width: 40%;
    }
  }

  > .btn {
    margin-top: 20px;
    width: 150px;
    &.-back-btn {
      margin-left: 10px;
    }
  }
}

.form-item {
  > .form-input {
    width: 100%;
    border: 1px solid #313131;
    padding: 8px 16px;
    background-color: #2b2b2b;
    color: #fff;
    & -borderless {
      border: 0px;
    }
  }

  > .form-label {
    display: block;
    margin-bottom: 10px;
  }
}

.error-container {
  > .error {
    margin-top: 5px;
    font-size: 13px;
    color: $register-orange;
    &:not(:first-child) {
      display: none;
    }
  }
}

::-webkit-calendar-picker-indicator {
    filter: invert(1);
}
</style>