<template>
  <div id="app">
    <nav-bar/>
    <aside-menu :menu="menu"/>
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
  /* data () {
    return {
      menu1: [
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
      ],
      menu2: [
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
  }, */
  computed: {
    menu () {
      if ((this.$options.parent._route.name !== 'login') && (this.$options.parent._route.name !== 'home') && (this.$options.parent._route.name !== 'about')) {
        return [
          'General',
          [
            {
              to: '/dash',
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
              label: 'Insertion',
              subLabel: 'Insertion des données',
              icon: 'view-list',
              menu: [
                {
                  href: '/insertion/departement',
                  label: 'Departement'
                },
                {
                  href: '/insertion/formation',
                  label: 'Formation'
                }
              ]
            },
            {
              label: 'Tables',
              subLabel: 'Tables des données',
              icon: 'table',
              menu: [
                {
                  href: '/tables/departement',
                  label: 'Départements'
                },
                {
                  href: '/tables/formation',
                  label: 'Formations'
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
    if (this.$session.exists()) {
      this.$store.commit('user', {
        name: this.$session.get('username'),
        email: this.$session.get('email'),
        avatar: 'https://avatars.dicebear.com/api/avataaars/man-adm.svg?top[]=shortHair&hairColor[]=black&clothes[]=blazerAndSweater&clothesColor[]=black&eyes[]=default&eyebrow[]=default&mouth[]=default'
      })
    } else {
      this.$store.commit('user', {
        name: 'Guest',
        email: 'guest@auditdash.com',
        avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
      })
    }
    /* this.$store.commit('user', {
      name: 'Guest',
      email: 'guest@auditdash.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    }) */
    // console.log(this.$options)
    // console.log(this.$options.parent._route.name)
    // console.log(this.location.pathname)
    // console.log(this.$options.parent._routerRoot._route.name)
    // console.log(this.$store.isLog)
    // this.$session.destroy()
  }
}
</script>
