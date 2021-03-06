<template>
  <nav v-show="isNavBarVisible" id="navbar-main" class="navbar is-fixed-top">
    <div class="navbar-brand">
      <a class="navbar-item is-hidden-desktop" @click.prevent="menuToggleMobile">
        <b-icon :icon="menuToggleMobileIcon"/>
      </a>
    </div>
    <div class="navbar-brand is-right">
      <a class="navbar-item navbar-item-menu-toggle is-hidden-desktop" @click.prevent="menuNavBarToggle">
        <b-icon :icon="menuNavBarToggleIcon" custom-size="default"/>
      </a>
    </div>
    <div class="navbar-menu fadeIn animated faster" :class="{'is-active':isMenuNavBarActive}">
      <div class="navbar-end">
        <nav-bar-menu class="has-divider has-user-avatar">
          <user-avatar/>
          <div class="is-user-name">
            <span>{{ userName }}</span>
          </div>
          <div v-if="this.$session.exists()" slot="dropdown" class="navbar-dropdown">
            <router-link to="/profile" class="navbar-item" exact-active-class="is-active">
              <b-icon icon="account" custom-size="default"></b-icon>
              <span>My Profile</span>
            </router-link>
            <a class="navbar-item">
              <b-icon icon="settings" custom-size="default"></b-icon>
              <span>Settings</span>
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" @click="logout">
              <b-icon icon="logout" custom-size="default"></b-icon>
              <span>Se déconnecter</span>
            </a>
          </div>
        </nav-bar-menu>
        <router-link to="/about" class="navbar-item has-divider is-desktop-icon-only" title="A propos">
          <b-icon icon="help-circle-outline" custom-size="default"/>
          <span>A propos</span>
        </router-link>
        <a v-if="this.$session.exists()" class="navbar-item is-desktop-icon-only" title="Se déconnecter" @click="logout">
          <b-icon icon="logout" custom-size="default"/>
          <span>Log out</span>
        </a>
        <a v-if="!this.$session.exists()" class="navbar-item is-desktop-icon-only" title="S'identifier" @click="login">
          <b-icon pack="fa" icon="user" custom-size="default"/>
          <span>S'identifier</span>
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState } from 'vuex'
import NavBarMenu from '@/components/NavBarMenu'
import UserAvatar from '@/components/UserAvatar'

export default {
  name: 'NavBar',
  components: {
    UserAvatar,
    NavBarMenu
  },
  data () {
    return {
      isMenuNavBarActive: false
    }
  },
  computed: {
    menuNavBarToggleIcon () {
      return (this.isMenuNavBarActive) ? 'close' : 'dots-vertical'
    },
    menuToggleMobileIcon () {
      return this.isAsideMobileExpanded ? 'backburger' : 'forwardburger'
    },
    darkModeToggleIcon () {
      return this.isDarkModeActive ? 'white-balance-sunny' : 'weather-night'
    },
    ...mapState([
      'isNavBarVisible',
      'isAsideMobileExpanded',
      'isDarkModeActive',
      'userName'
    ])
  },
  mounted () {
    this.$router.afterEach(() => {
      this.isMenuNavBarActive = false
    })
  },
  methods: {
    menuToggleMobile () {
      this.$store.commit('asideMobileStateToggle')
    },
    menuNavBarToggle () {
      this.isMenuNavBarActive = (!this.isMenuNavBarActive)
    },
    darkModeToggle () {
      this.$store.commit('darkModeToggle')
    },
    logout () {
      this.$session.destroy()
      this.$store.state.isLog = false
      this.$store.commit('user', {
        name: 'Guest',
        email: 'guest@auditdash.com',
        avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
      })
      this.$router.push({ name: 'home' })
      this.$buefy.snackbar.open({
        message: 'Vous avez déconnecté',
        queue: false
      })
    },
    login () {
      this.$router.push({ name: 'login' })
    }
  }
}
</script>
