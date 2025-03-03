<template>
  <v-app-bar
    app
    flat
    class="app-bar"
    height="38"
  >
    <v-container
      class="d-flex align-center justify-space-between min-w-100"
    >
      <div class="text-uppercase cursor-help">
        Lv. 1
        <v-tooltip
          class="tooltip-app-bar text-center"
          activator="parent"
          location="bottom"
          open-on-click
        >
          <v-row
            class="flex-column"
            no-gutters
          >
            <v-col class="text-uppercase">
              Exp
            </v-col>
            <v-col>0 / 5</v-col>
          </v-row>
        </v-tooltip>
      </div>
      <div class="cursor-help">
        <v-row
          class="align-center ga-1"
          no-gutters
        >
          <v-col class="d-flex align-center justify-center">
            <v-img
              src="@/assets/images/icons/life.svg"
              width="16"
              height="16"
              eager
            />
          </v-col>
          <v-col class="d-flex align-center justify-center">
            100/100
          </v-col>
        </v-row>
        <v-tooltip
          class="tooltip-app-bar text-center"
          activator="parent"
          location="bottom"
          open-on-click
        >
          Sua vida
        </v-tooltip>
      </div>
      <div class="cursor-help">
        <v-row
          class="align-center ga-1"
          no-gutters
        >
          <v-col class="d-flex align-center justify-center">
            <v-img
              src="@/assets/images/icons/gold.svg"
              width="16"
              height="16"
              eager
            />
          </v-col>
          <v-col class="d-flex align-center justify-center">
            200
          </v-col>
        </v-row>
        <v-tooltip
          class="tooltip-app-bar text-center"
          activator="parent"
          location="bottom"
          open-on-click
        >
          Seu ouro
        </v-tooltip>
      </div>
      <div class="cursor-help">
        <v-row
          class="align-center ga-1"
          no-gutters
        >
          <v-col class="d-flex align-center justify-center">
            <v-img
              src="@/assets/images/icons/files.svg"
              width="16"
              height="16"
              eager
            />
          </v-col>
          <v-col class="d-flex align-center justify-center text-uppercase">
            All
          </v-col>
        </v-row>
        <v-tooltip
          class="tooltip-app-bar text-center min-width-180"
          activator="parent"
          location="bottom"
          open-on-click
        >
          <v-row
            class="align-center ga-1"
            no-gutters
          >
            <v-col class="d-flex align-center justify-center">
              <v-img
                src="@/assets/images/icons/credit.svg"
                width="16"
                height="16"
                eager
              />
            </v-col>
            <v-col class="d-flex align-center justify-center">
              15.000 créditos
            </v-col>
          </v-row>
          <v-divider class="my-2" />
          <v-row
            class="align-center ga-1"
            no-gutters
          >
            <v-col class="d-flex align-center justify-center">
              <v-icon
                left
                class="ra ra-emerald"
                size="16"
                color="teal"
              />
            </v-col>
            <v-col class="d-flex align-center justify-center">
              0 esmeraldas
            </v-col>
          </v-row>
          <v-divider class="my-2" />
          <v-row
            class="align-center ga-1"
            no-gutters
          >
            <v-col class="d-flex align-center justify-center">
              <v-icon
                left
                class="ra ra-sapphire"
                size="16"
                color="light-blue-accent-4"
              />
            </v-col>
            <v-col class="d-flex align-center justify-center">
              0 safiras
            </v-col>
          </v-row>
          <v-divider class="my-2" />
          <v-row
            class="align-center ga-1"
            no-gutters
          >
            <v-col class="d-flex align-center justify-center">
              <v-icon
                left
                class="ra ra-crystals"
                size="16"
                color="purple"
              />
            </v-col>
            <v-col class="d-flex align-center justify-center">
              0 cristais
            </v-col>
          </v-row>
          <v-divider class="my-2" />
          <v-row
            class="align-center ga-1"
            no-gutters
          >
            <v-col class="d-flex align-center justify-center">
              <v-icon
                left
                class="ra ra-diamond"
                size="16"
                color="grey-darken-2"
              />
            </v-col>
            <v-col class="d-flex align-center justify-center">
              0 diamantes
            </v-col>
          </v-row>
        </v-tooltip>
      </div>
    </v-container>
  </v-app-bar>
</template>
  
<script setup lang="ts"></script>
  
<style scoped>
.app-bar {
  border-bottom: 2px solid #4e5254 !important;
  background: linear-gradient(180deg, #020a13 0%, #002f5e 100%) !important;
  box-shadow: 0 4px 9px 0 rgba(0, 0, 0, .75) !important;
}
</style>

<style>
.tooltip-app-bar > .v-overlay__content {
  background: #002f5e !important;
  color: rgb(246, 246, 246) !important;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 10px !important;
  border-radius: 10px !important;
  border-width: 1px !important;
  border-style: solid !important;
  border-color: rgb(78, 82, 84) !important;
  min-width: 140px !important;
}

.tooltip-app-bar.min-width-180 > .v-overlay__content {
  min-width: 180px !important;
}
</style>