<template>
    <div>
        <Form :label-width="80">
            <Row align="middle"  type="flex" justify="center">
                    <Col span="6">
                        <FormItem label="上传后台war包：" :label-width="150">
                            <Upload action="//localhost:5000/upload" name="myfile"
                                    :before-upload="startUpload"
                                    :on-success="uploadSuccess"
                                    :on-error="uploadError">
                                <Button type="ghost" icon="ios-cloud-upload-outline">Upload files</Button>
                            </Upload>
                        </FormItem>
                    </Col>
            </Row>
            <Row align="middle"  type="flex" justify="center">
                <Col span="6">
                    <Button type="primary" @click="startWar">开始执行</Button>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    export default {
        name: "filesystem",
        data() {
            return {
                warFile: {}
            }
        },
        methods: {
            startUpload(file) {
                this.$Message.loading({
                    content: '正在上传中稍后...',
                    duration: 0
                });
            },
            uploadError(error, file, fileList) {
                this.$Message.destroy();
                this.$Message.error("上传失败!")
                console.error(error);
            },
            uploadSuccess(response, file, fileList) {
                this.$Message.destroy();
                this.$Message.info(JSON.stringify(response))
                this.warFile = file;
            },
            startWar() {
                var $this = this;
                this.axios.post ('startWar',{"fileName": this.warFile.name})
                    .then(function(response){
                        if(response.data.success === true){
                            $this.$Message.success("执行成功！");
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>