<template>
  <div>
  <!--头部-->
  <!--轮播-->
    <div class="yd-slider">
     <yd-slider autoplay="3000" >
          <yd-slider-item v-for="item in banner">
            <a  :href='item.link' v-on:click="clickBanner(item.id)">
              <img :src='item.image'>
            </a>
          </yd-slider-item>
      </yd-slider>
    </div>
    <!--商品列表-->
    <yd-list theme="3" slot="list">
      <yd-list-item v-for="item in list">
        <a slot="img"  :href='item.link' v-on:click="clickProduct(item.id)">
        <img slot="img" :src='item.image'>
        </a>
        <a slot='title' :href='item.link'  v-on:click="clickProduct(item.id)">
        <span slot="title" class="name">{{item.title}}</span>
        </a>
        <a slot="other" :href='item.link'  v-on:click="clickProduct(item.id)">
        <yd-list-other slot="other">
          <div>
            <span class="list-price" style="font-size: .35rem"><b>{{item.price}}</b></span>
          </div>
        </yd-list-other>
        </a>
      </yd-list-item>
    </yd-list>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        page: 1,
        pageSize: 10,
        list: [],
        banner:[]
      }
    },
    methods: {
      getData(){
        this.$http.get('client/banners').then((response) => {
          console.log(response.data.result.data);
          this.banner=response.data.result.data;
        })
        this.$http.get('client/products').then((response) => {
          console.log(response.data.result.data);
          this.list=response.data.result.data;
        })
      },
      clickBanner(id){
        this.$http.post('client/clickData?click=banner&&id='+id);

      },
      clickProduct(id,link){
        this.$http.post('client/clickData?click=product&&id='+id);
      }
    },
    created(){
      this.getData();
    },
  }

</script>

&lt;!&ndash; Add "scoped" attribute to limit CSS to this component only &ndash;&gt;
<style scoped>
.yd-slider{
  margin:0;
  width:100%;
}
  img{
    width:100%;
  }
  .cat{
    width: 1.9rem;
    height: 1.46rem;
    position:absolute;
    top:25px;
    right:5px;
    z-index: 10000;
  }
  .name{
    font-size: .28rem;
  }
</style>

