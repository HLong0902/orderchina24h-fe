<script setup>
import ROUTES from "../../../../../../constants/routeDefine";
import ApiCaller from "../../../../../utils/ApiCaller";
import CommonUtils from "../../../../../utils/CommonUtils";
import { useCommonStore } from "../../../../../../store/CommonStore";
import CONSTANT from "../../../../../../constants/constants";
import REGEX from "../../../../../../constants/regexDefine";
</script>

<!-- template section -->
<template>
	<div id="content" class="clearfix fullwidth">
		<div class="lists_ship clearfix">
			<h2 class="float-left">Danh sách đóng bao tại kho Trung Quốc</h2>
		</div>
		<div class="filer_box">
			<form method="GET" @submit.prevent="handleSubmit">
				User:<input
					v-model="filter.bagLabel"
					type="text"
					value=""
					name="filter_name"
				/>
                Tên nhân viên:<input
					v-model="filter.bagLabel"
					type="text"
					value=""
					name="filter_name"
				/>
				
                <br>

				Vai trò:
				<select v-model="filter.role">
					<option value="">Tất cả</option>
					<option v-for="(value, key) in CONSTANT.ROLE" :key="key" :value="value">
						{{ CommonUtils.promptRoleNameByValue(value) }}
					</option>
				</select>
                &nbsp;
                <input
					class="button"
					type="submit"
					value="Tìm kiếm"
					@click="getAllStaffs"
				/>
                &nbsp;
                <input
					class="button"
					type="submit"
					value="Thêm nhân viên"
					@click="openModal('add-staffs')"
				/>

                <b-modal
                    hide-header-close
                    centered
                    size="lg"
                    title-html="Tạo mới người dùng"
                    id="add-staffs"
                >
                    <div>
                        <span style="font-size: 16px; font-weight: 500;" class="bold">Thông tin người dùng: </span>
                        <br>
                        <br>
                        <table>
                            <tr>
                                <td width="15%">
                                    <span class="bold">User: </span>
                                </td>
                                <td width="35%">
                                    <input v-model="staff.username" size="30" type="text">
                                </td>
                                &nbsp;
                                <td width="15%">
                                    <span class="bold">Tên nhân viên: </span>
                                </td>
                                <td width="35%">
                                    <input v-model="staff.fullName" size="30" type="text">
                                </td>
                            </tr>
                            <br>
                            <tr>
                                <td width="15%">
                                    <span class="bold">Ngày sinh: </span>
                                </td>
                                <td width="35%">
                                    <input v-model="staff.dob" size="30" type="date">
                                </td>
                                &nbsp;
                                <td width="15%">
                                    <span class="bold">Giới tính: </span>
                                </td>
                                <td width="35%">
                                    <select v-model="staff.sex">
                                        <option :value="1">Nam</option>
                                        <option :value="0">Nữ</option>
                                    </select>
                                </td>
                            </tr>
                            <br>
                            <tr>
                                <td width="15%">
                                    <span class="bold">Số điện thoại: </span>
                                </td>
                                <td width="35%">
                                    <input v-model="staff.phone" size="30" type="text">
                                </td>
                                &nbsp;
                                <td width="15%">
                                    <span class="bold">Email: </span>
                                </td>
                                <td width="35%">
                                    <input v-model="staff.email" size="30" type="text">
                                </td>
                            </tr>
                            <br>
                            <tr>
                                <td width="15%">
                                    <span class="bold">Mật khẩu: </span>
                                </td>
                                <td width="35%">
                                    <input v-model="staff.password" size="30" type="text">
                                </td>
                                &nbsp;
                                <td width="15%">
                                    <span class="bold">Trạng thái: </span>
                                </td>
                                <td width="35%">
                                    <select v-model="staff.isActive">
                                        <option :value="1">Hoạt động</option>
                                        <option :value="0">Ngừng hoạt động</option>
                                    </select>
                                </td>
                            </tr>
                            <br>
                            <tr>
                                <td width="15%">
                                    <span class="bold">Nhập lại mật khẩu: </span>
                                </td>
                                <td width="35%">
                                    <input v-model="staff.reEnterPass" size="30" type="text">
                                </td>
                                &nbsp;
                                <td width="15%">
                                    <span class="bold">Vai trò: </span>
                                </td>
                                <td width="35%">
                                    <select v-model="staff.role">
                                        <option v-for="(value, key) in CONSTANT.ROLE_STAFF" :key="key" :value="value">
                                            {{ CommonUtils.promptRoleNameByValue(value) }}
                                        </option>
                                    </select>
                                </td>
                            </tr>
                            <br>
                        </table>
                    </div>
                    <template #modal-footer>
                        <b-button
                            variant="outline-primary"
                            style="font-size: 12px"
                            squared
                            @click="createStaff"
                            class="squared-button"
                        >
                            Lưu
                        </b-button>
                        <b-button
                            variant="outline-danger"
                            style="font-size: 12px"
                            squared
                            class="squared-button"
                            @click="hideModal(`add-staffs`)"
                        >
                            Đóng
                        </b-button>
                    </template>
                </b-modal>

			</form>
		</div>
		<div class="gridtable">
			<table>
				<tbody>
					<tr>
						<td>STT</td>
						<td>User</td>
						<td>Tên nhân viên</td>
						<td>Ngày sinh</td>
						<td>Giới tính</td>

						<td>Số điện thoại</td>
						<td>Email</td>
						<td>Vai trò</td>
                        <td>Trạng thái hoạt động</td>
					</tr>
					<tr v-for="(staff, index) in staffs">
						<td>{{ index + 1 }}</td>
						<td>
							<span class="blue">
                                {{ staff.username }}
                            </span>
						</td>
						<td class="align-center">
							<span class="bold">
                                {{ staff.fullName }}
                            </span>
						</td>
						<td>
							<span>{{ staff.birthday }}</span>
						</td>
						<td class="align-center">
							<span class="bold green">{{ staff.sex }}</span>
						</td>

						<td class="align-center">
							<span class="bold">{{ staff.phone }}</span>
						</td>

						<td>
							<span class="blue">{{ staff.email }}</span>
						</td>
						<td>
							<span class="red">{{ CommonUtils.promptRoleNameByValue(staff.role) }}</span>
						</td>
                        <td class="align-center">
							<span class="bold green">{{ staff.isActive == null ? 'Hoạt động' : staff.isActive }}</span>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
		<!-- <ul class="pagination">
			<li class="active"><a>1</a></li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					>2</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=20"
					data-ci-pagination-page="3"
					>3</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=10"
					data-ci-pagination-page="2"
					rel="next"
					>Trang sau »</a
				>
			</li>
			<li>
				<a
					href="https://ql.hangquangchau24h.vn/storecn/lists_package?page=15500"
					data-ci-pagination-page="1551"
				>
					»</a
				>
			</li>
		</ul> -->
		<p>
			<strong>Total: <span class="green">{{ staffs.length }}</span> (Items)</strong>
		</p>
	</div>
</template>

<!-- function defined -->
<script>
export default {
	name: "StaffManagementStaffSection",
	data() {
		return {
			staffs: [],

            staff: {
                username: '',
                fullName: '',
                dob: null,
                sex: 0,
                phone: '',
                email: '',
                password: '',
                reEnterPass: '',
                isActive: 1,
                role: 2,
            },

			filter: {
				user: '',
                fullname: '',
                role: '',
			},

			commonStore: useCommonStore(),
		};
	},
	mounted() {
		this.getAllStaffs();
	},
	methods: {
		async getAllStaffs() {
			const loader = this.$loading.show();
			const res = await ApiCaller.get(
				ROUTES.User.getAll,
			);
			loader.hide();
			this.staffs = res.data.filter($ => ($.role != null || $.role != 0));
            debugger
		},
        openModal(modal) {
			this.$bvModal.show(modal);
		},
		hideModal(id) {
			this.$bvModal.hide(id);
			this.otherFeeRes = {};
			this.otherFee = {
				amount: null,
				note: '',
			}
		},
        async createStaff() {
            await this.validate();
            const loader = this.$loading.show();
            const res = await ApiCaller.post(ROUTES.Auth.registerStaff, this.staff);
            if (res.status == 200) {
                this.$toast.success(`Tạo nhân viên thành công`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            } else {
                this.$toast.error(`${res.data.message}`, {
                    title: 'Thông báo',
                    position: 'top-right',
                    autoHideDelay: 7000,
                })
            }
            loader.hide();
            this.getAllStaffs();

        },
        async validate() {
            if(this.staff.password != this.staff.reEnterPass) {
                this.$toast.error(`Thông tin nhập lại mật khảu không trùng khớp với mật khẩu đã chọn`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
            }

            if(!this.staff.username || this.staff.username.length == 0) {
                this.$toast.error(`Thông tin User là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
            }

            if(!this.staff.fullName || this.staff.fullName.length == 0) {
                this.$toast.error(`Thông tin tên nhân viên là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
            }

            if(!this.staff.dob || this.staff.dob.length == 0) {
                this.$toast.error(`Thông tin ngày sinh là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
            }
            
            if(!this.staff.phone || this.staff.phone.length == 0) {
                this.$toast.error(`Thông tin số điện thoại là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
            } else {
                if(!this.isValidPhone(this.staff.phone)) {
                    this.$toast.error(`Định dạng số điện thoại không chính xác`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                    return;
                }
            }
            
            if(!this.staff.email || this.staff.email.length == 0) {
                this.$toast.error(`Thông tin email là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
            } else {
                if(!this.isValidEmail(this.staff.email)) {
                    this.$toast.error(`Định dạng email không chính xác`, {
                        title: 'Thông báo',
                        position: 'top-right',
                        autoHideDelay: 7000,
                    })
                    return;
                }
            }
            
            if(!this.staff.password || this.staff.password.length == 0) {
                this.$toast.error(`Thông tin mật khẩu là bắt buộc`, {
					title: 'Thông báo',
					position: 'top-right',
					autoHideDelay: 7000,
				})
				return;
            }
            
        },
        isValidEmail(email) {
            return REGEX.EMAIL_PATTERN.test(email);
        },
        isValidPhone(phone) {
            return REGEX.PHONE_PATTERN.test(phone);
        },
	},
};
</script>

<!-- style custom -->
<style scoped></style>
