import {getAction} from '@/request/http.js'
export const listMixins = {
  data(){
    return {
      // 查询参数
      queryParam:{},
      // 表单数据
      dataSource:null,
      // 分页
      pagination:{
        current:1, // 当前页
        pageSize:50, // 每页条数
        pageSizeOptions:['10','20','30','50'], 
        showSizeChanger:true,
        total:0,
        showTotal:function(total,range){
          return range[0] + "-" + range[1] + " 共" + total + "条"
        }
      },
      loading:false,
      labelCol:{
        span:6
      },
      wrapperCol:{
        span:16,
        offset:2
      },
      selectedRowKeys:[]
    }
  },
  methods:{
    // 获取列表数据
    getListData(){
      if(this.url.list){
        this.loading = true;
        getAction(this.url.list,{...this.queryParam,page:this.pagination.current,size:this.pagination.pageSize,...this.customParams}).then(res=>{
          if(res.code == 0){
            this.dataSource = res.result;
            this.pagination.total = res.total;
          }else{
            this.$message.warning(res.msg)
          }
        }).finally(()=>{
          this.loading = false
        })
      }else{
        this.$message.warning('请设置列表url')
      }
      
    },
    // 分页数据发生改变
    handleTableChange(e){
      this.pagination = e;
      this.getListData();
    },
    // 查询数据
    searchQuery(){
      this.getListData()
    },
    // 清空条件
    searchReset(){
      this.pagination.current = 1;
      this.pagination.pageSize = 10;
      this.queryParam = {};
      this.getListData()
    },
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
  }
}