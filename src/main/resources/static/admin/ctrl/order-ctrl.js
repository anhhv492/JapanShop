app.controller('order-admin-ctrl',function($rootScope,$scope,$http,$window){
    var urlOrder=`http://localhost:8080/rest/staff/order`;
    $scope.orders=[];
    $rootScope.idOrder=null;
    $rootScope.orderModel= {};
    $scope.form= {};
    $scope.showUpdate=false;
    $scope.checkHoTen=false;
    $scope.checkNgayMua=false;
    $scope.checkTongGia=false;
    $scope.checkTrangThai=false;
    $scope.status = [
        {id : '', name : "Thay đổi"},
        {id : 0, name : "Chờ xác nhận"},
        {id : 1, name : "Xác nhận"},
        {id : 2, name : "Đang giao hàng"},
        {id : 3, name : "Hoàn tất giao dịch"},
        {id : 4, name : "Hủy đơn"},
        {id : 5, name : "Hoàn trả"},
    ];
    const jwtToken = localStorage.getItem("jwtToken")
    const token = {
        headers: {
            Authorization: `Bearer ` + jwtToken
        }
    }
    $scope.getAll=function(){
        $http.get(urlOrder,token).then(function(response){
            $scope.orders=response.data;
        }).catch(error=>{
            console.log('error getOrder',error);
        });
    }
    $scope.show=function(){
        $scope.showUpdate=true;

    }
    $scope.getOrder=function(item){
        $rootScope.idOrder=item.idOrder;
        $rootScope.orderModel=item;
    }
    $scope.updateStatus=function(id){
        let urlUpdate=`http://localhost:8080/rest/staff/order`;
        $scope.showUpdate=false;
        $scope.form.idOrder=id;
        Swal.fire({
            title: 'Bạn có chắc muốn đổi trạng thái không?',
            text: "Đổi không thể quay lại!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Xác nhận'
        }).then((result) => {
            if (result.isConfirmed) {
                $http.put(urlUpdate,$scope.form,token).then(function(response){
                    if(response.data){
                        $scope.form.status=null;
                        $scope.getAll();
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'success',
                            title: 'Thay đổi thành công!'
                        })
                    }else{
                        const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true,
                            didOpen: (toast) => {
                                toast.addEventListener('mouseenter', Swal.stopTimer)
                                toast.addEventListener('mouseleave', Swal.resumeTimer)
                            }
                        })

                        Toast.fire({
                            icon: 'error',
                            title: 'Không thể thay đổi trạng thái!'
                        })
                    }
                }).catch(error=>{
                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'error',
                        title: 'Không thể thay đổi trạng thái!'
                    })
                });
            }
        })
    }
    $scope.hoTen=function(){
        $scope.checkHoTen=!$scope.checkHoTen;
    }
    $scope.ngayMua=function(){
        $scope.checkNgayMua=!$scope.checkNgayMua;
    }
    $scope.tongGia=function(){
        $scope.checkTongGia=!$scope.checkTongGia;
    }
    $scope.trangThai=function(){
        $scope.checkTrangThai=!$scope.checkTrangThai;
    }
    $scope.status.id='';
    $scope.getAll();
});