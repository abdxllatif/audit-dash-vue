<template>
  <div id="app">
    <nav-bar/>
    <aside-menu :menu="menu" @menu-click="menuClick"/>
    <router-view/>
    <footer-bar/>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
export default {
  name: 'home',
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      if ((this.$options.parent._route.name !== 'login') && (this.$options.parent._route.name !== 'home')) {
        return [
          'General',
          [
            {
              to: '/',
              icon: 'desktop-mac',
              label: 'Dashboard'
            }
          ],
          'Menu',
          [
            {
              to: '/tables',
              label: 'Tables',
              icon: 'table',
              updateMark: true
            },
            {
              to: '/forms',
              label: 'Inerstion',
              icon: 'square-edit-outline'
            },
            {
              to: '/profile',
              label: 'Profile',
              icon: 'account-circle'
            },
            {
              label: 'Submenus',
              subLabel: 'Submenus Example',
              icon: 'view-list',
              menu: [
                {
                  href: '#void',
                  label: 'Sub-item One'
                },
                {
                  href: '#void',
                  label: 'Sub-item Two'
                }
              ]
            }
          ],
          'About',
          [
            {
              href: 'https://admin-null.justboil.me',
              label: 'Premium Demo',
              icon: 'credit-card'
            },
            {
              href: '/about',
              label: 'A propos',
              icon: 'help-circle'
            }
          ]
        ]
      } else {
        return [
          'General',
          [
            {
              to: '/',
              icon: 'desktop-mac',
              label: 'Acceuil'
            },
            {
              to: '/login',
              icon: 'account-circle',
              label: "S'identifier"
            }
          ],
          'About',
          [
            {
              href: '/about',
              label: 'A propos',
              icon: 'help-circle'
            }
          ]
        ]
      }
    }
  },
  created () {
    this.$store.state.isFooterBarVisible = true
    this.$store.state.isAsideMobileExpanded = false
    this.$store.commit('user', {
      name: 'Guest',
      email: 'guest@auditdash.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
    console.log(this.$options)
    console.log(this.$options.parent._route.name)
    console.log(this.location.pathname)
    console.log(this.$options.parent._routerRoot._route.name)
  }
}
</script>
