app.controller('order-detail-ctrl',function($rootScope,$scope,$http){
    var urlOrder=`http://localhost:8080/rest/user/order/detail`;
    $scope.orderDetails=[];
    $scope.formProductChange={};
    // $scope.saleadd = {};
    $scope.idCheckBox = {};
    $scope.seLected = [];

    const jwtToken = localStorage.getItem("jwtToken")
    const token = {
        headers: {
            Authorization: `Bearer `+jwtToken
        }
    }
    $scope.getAllByOrder=function(){
        let id = $rootScope.idOrder;
        $http.get(urlOrder+`/${id}`,token).then(resp=>{
            $scope.orderDetails=resp.data;
        }).catch(error=>{
            console.log(error);
        })
    }
    $scope.message = function (mes){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        Toast.fire({
            icon: 'success',
            title: mes,
        })
    }
    $scope.error =  function (err){
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: err,
        })
    }
    //$scope.files={};
    $scope.checkSelected= function (id){
        var check = true;
        for(var i=0;i<$scope.seLected.length;i++){
            if($scope.seLected[i]==id){
                check = false;
                $scope.seLected.splice(i,1);
            }
        }
        if (check){
            $scope.seLected.push(id);
        }
    }
    $scope.checkSelect=function (id){
        for(var i=0;i<$scope.seLected.length;i++){
            if($scope.seLected[i]==id){
                return true;
            }
        }
    }
    $scope.uploadFileChange = function(files){
        $scope.files = files;
        console.log($scope.files);
    }
    $scope.editProductChange = function (formProductChange){
        $scope.formProductChange = angular.copy(formProductChange);
        console.log( 'dsdsadsadsav '+$scope.formProductChange.name)
    }
    $scope.saveProductChange = function (){
        Swal.fire({
            title: 'Bạn có chắc muốn trà máy : '+$scope.formProductChange.accessory.name+'?',
            text: "Đổi trả hàng có thể mất thêm phí !",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let timerInterval
                Swal.fire({
                    title: 'Tạo yêu cầu thành công' +'!',
                    html: 'Vui lòng chờ <b></b> milliseconds.',
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: () => {
                        Swal.showLoading()
                        const b = Swal.getHtmlContainer().querySelector('b')
                        timerInterval = setInterval(() => {
                            b.textContent = Swal.getTimerLeft()
                        }, 100)
                    },
                    willClose: () => {
                        clearInterval(timerInterval)
                    }
                }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.timer) {
                        var formData = new FormData();
                        angular.forEach($scope.files, function(file) {
                            formData.append('files', file);
                        });
                        formData.append('account', $scope.formProductChange.account);
                        formData.append('note', $scope.formProductChange.note);
                        formData.append('price', $scope.formProductChange.price);
                        // formData.append('price',$scope.formProductChange.name);
                        let req = {
                            method: 'POST',
                            url: '/rest/productchange/save',
                            headers: {
                                'Content-Type': undefined,
                            },
                            data: formData
                        }
                        Swal.fire({
                            title: 'Đang gửi yêu cầu đến admin' +'!',
                            html: 'Vui lòng chờ <b></b> milliseconds.',
                            timer: 3500,
                            timerProgressBar: true,
                            didOpen: () => {
                                Swal.showLoading()
                                const b = Swal.getHtmlContainer().querySelector('b')
                                timerInterval = setInterval(() => {
                                    b.textContent = Swal.getTimerLeft()
                                }, 100)
                            },
                            willClose: () => {
                                clearInterval(timerInterval)
                            }
                        })
                        $http(req).then(response => {
                            console.log("ddd " + response);
                            $scope.message("Gửi yêu cầu đổi trả thành công");
                            // $scope.refresh();
                            $('#exampleModal').modal('hide');
                        }).catch(error => {
                            $scope.error('gửi  yêu cầu đổi trả thất bại');
                            console.log('I was closed by the timer'+ formData)
                        });

                    }
                })

            }
        })
    }
    $scope.getAllByOrder();
});