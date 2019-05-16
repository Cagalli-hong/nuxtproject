<template>
  <div>
    <h1>上传2-5张图片</h1>
    <el-form :model="form" ref="editForm" label-width="120px" class="edit-form">
       <el-form-item label="详情图" prop="packageFileId">
         <el-upload
          action="/cas-file-app/image/upload"
          :class="form.screenImgs.length < 5 ? '' : 'hidden'"
          :auto-upload="false" 
          :multiple="true"
          :limit="5" 
          :file-list="form.screenImgs" 
          :on-preview="imgPreview"
          :on-change="onChange" 
          :on-remove="imgRemove" 
          :on-exceed="overnum" 
          list-type="picture-card">
          <i class="el-icon-plus"></i>
          <div slot="tip" class="el-upload__tip">请上传2~5张截图（尺寸一致），单张图片不超过1M，截图不能小于680x255像素，JPG、PNG格式。</div>
        </el-upload>
       </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import { uploadimg, getAllbanner } from '../../config/api/app'

  export default {
    name: 'introduce',
    data() {
      return {
        form: {
          screenImgs: []
        }
      }
    },
    mounted() {
      getAllbanner().then(res => {
        console.log('res', res)
      }).catch(err => {
        console.log(err)
        // this.onError()
      })
    },
    methods: {
      imgBeforeUpload(file) {
        const isIMG = file.type === 'image/jpeg' || file.type === 'image/png'
        const isLt1 = file.size / 1024 / 1024 < 1
        if (!isIMG) {
          this.$message.error('上传图片只能是 JPG 或者 PNG 格式！')
        }
        if (!isLt1) {
          this.$message.error('上传图片大小不能超过 1M ！')
        }
        const isSize = new Promise((resolve, reject) => {
          const img = new Image()
          img.onload = function() {
            const valid = img.width >= 680 && img.height >= 255
            valid ? resolve() : reject(new Error())
          }
          const _URL = window.URL || window.webkitURL
          img.src = _URL.createObjectURL(file)
        }).then(() => {
          return file
        }, () => {
          this.$message.error('上传图片大小不能小于 680x255 ！')
          return Promise.reject(new Error())
        })
        return isIMG && isLt1 && isSize
      },
      imgSuccess(res, file) {
        this.form.screenImgs.push({ url: res.data.filePath, fileId: res.data.fileId, uid: file.uid })
      },
      imgRemove(file, fileList) {
        const idx = this.form.screenImgs.findIndex(item => {
          return file.uid === item.uid
        })
        if (idx > -1) {
          this.form.screenImgs.splice(idx, 1)
        }
      },
      imgPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      overnum(file, fileList) {
        this.$message.error(`最多只能上传5张图片,请重新选择!`)
      },
      onChange(file, fileList) {
        if (file.raw) { // 判断是不是已经上传过
          if (this.imgBeforeUpload(file.raw)) { // 判断上传的文件格式大小
            const formData = new FormData()
            formData.append('file', file.raw, file.raw.name)
            formData.append('fileType', 1)
            uploadimg(formData).then(res => { // 自定义上传
              this.imgSuccess(res, file)
            }).catch(err => {
              console.log(err)
              // this.onError()
            })
          } else {
            fileList.pop() // 停止上传
          }
        }
      }
    }
  }
</script>
<style lang="scss">

</style>
