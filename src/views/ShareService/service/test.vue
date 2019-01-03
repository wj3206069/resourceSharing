<template>
  <div class="box">
    <div v-for="(item,index) in items"
         :key="index">
      <p @click="change(index,item.name)"
         class="check"
         :class="item.isActive==status[index].status?'':'active'">{{item.name}}</p>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: [
        {
          status: false
        },
        {
          status: false
        },
        {
          status: false
        },
        {
          status: false
        },
        {
          status: false
        }
      ],
      items: [
        { name: 'test1', isActive: false },
        { name: 'test2', isActive: false },
        { name: 'test3', isActive: false },
        { name: 'test4', isActive: false },
        { name: 'test5', isActive: false }
      ],
      list: []
    }
  },
  methods: {
    change (index, val) {
      this.items[index].isActive = !this.items[index].isActive
      let arrIndex = this.list.indexOf(val)
      console.log(arrIndex)

      if (arrIndex > -1) {
        this.list.splice(arrIndex, 1)
      } else {
        this.list.push(val)
      }
      console.log(this.list)
    }
  }
}
</script>

<style>
.check {
  width: auto;
  height: 25px;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: center;
  line-height: 25px;
  cursor: pointer;
}
.active {
  background: green;
  color: aliceblue;
}
</style>