<template>
	<div v-title data-title="商学会员">
		<div style="background: #FFFFFF;">
			<div class="pay_top">
				<img src="../../assets/VipPay.png" class="pay_top-VipPay" />
				<img src="../../assets/NotOpen.png" class="pay_top-Open" v-if="vipMarking == 1 || vipMarking == 2" />
				<img src="../../assets/AlreadyOpened.png" class="pay_top-Open" v-if="vipMarking == 3" />
			</div>
			<div class="select_pay">
				<p class="select_p" v-if="vipMarking == 1 || vipMarking == 2">会员支付</p>
				<p class="select_p" v-if="vipMarking == 3 && time > 0">
					会员续费
					<span class="select_pay-right">续费后有效期至：{{VipTime}}</span>
				</p>
				<div class="select_pay_content" v-for="item,key in orderData" :key="key" @click="vip_price(item,key)" :class="{'active':item.active}">
					<div class="left">
						<p class="select_content_p1" v-if="vipMarking == 1 || vipMarking == 2">开通{{item.name}}</p>
						<p class="select_content_p1" v-if="vipMarking == 3">续费{{item.name}}</p>
					</div>
					<div class="right">
						<p class="select_right_p">￥<span>{{item.price}}</span></p>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			<div class="VipPay_line"></div>
			<div class="vip_freedom">
				<p class="vip_freedom_p">专享权益</p>
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-filmstrip" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">免费观看<b>VIP</b>视频教程</p>
						<p class="vip_freedom-row-right-p2">免费观看vip栏目的全部教学，数万用户的首选</p>
					</el-col>
				</el-row>
				<!--<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-ic_school" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">享半价购买精品课程的资格</p>
						<p class="vip_freedom-row-right-p2">vip会员可半价购买精品课程，领域资深导师助力您的成长</p>
					</el-col>
				</el-row>-->
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-thumb-up" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">抢先看到最新教学视频</p>
						<p class="vip_freedom-row-right-p2">最新教学抢先看，实时助你了解政策动向，掌握最新知识</p>
					</el-col>
				</el-row>
				<!--<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-ic_local_activity" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">赠送5张免费观看精品课程门票</p>
						<p class="vip_freedom-row-right-p2">首次开通vip会员即可获得5张精品课程门票</p>
					</el-col>
				</el-row>-->
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-vimeo" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">拥有专属会员标识</p>
						<p class="vip_freedom-row-right-p2">vip会员专属标识，彰显您尊贵的身份</p>
					</el-col>
				</el-row>
				<el-row class="vip_freedom-row">
					<el-col :span="6" class="vip_freedom-row-left">
						<yd-icon class="vip_icon" name="icon-ic_settings_remote" custom size="0.54rem"></yd-icon>
					</el-col>
					<el-col :span="18" class="vip_freedom-row-right">
						<p class="vip_freedom-row-right-p1">高速通道更流畅</p>
						<p class="vip_freedom-row-right-p2">专享快速通道观看视频，缓存无障碍，给您更流畅的观看体验</p>
					</el-col>
				</el-row>
			</div>
			<div class="VipPay_line"></div>
			<div class="VipPay_help" @click="$router.push({name: 'MembershipHelp'})">
				<el-row class="VipPay_help-row">
					<el-col :span="12">
						<span>会员帮助中心</span>
					</el-col>
					<el-col :span="12" class="VipPay_help-row-right">
						<span>帮助FAQ ></span>
					</el-col>
				</el-row>
			</div>
			<div class="VipPay_service">
				<span @click="show = true">《企业家会员服务协议》</span>
			</div>
			<div class="VipPay_zhu">
				<span><yd-icon name="icon-ic_error" color="rgb(159, 159, 159)" custom size="0.24rem"></yd-icon>本产品为线上虚拟商品，购买后不予退款！</span>
			</div>
			<div class="pay_height"></div>
			<div class="pay_button">
				<el-row>
					<el-col :span="12" class="pay_button-left">
						<yd-checkbox-group v-model="checkbox" color="#0076FF" size="14" class="pay_group">
							<yd-checkbox val="1" shape="circle" class="pay_checkbox">
								<span style="font-size: 12px;">我已同意并阅读</span>
							</yd-checkbox>
						</yd-checkbox-group>
						<font color="#129cff" @click="show = true">服务协议</font>
					</el-col>
					<el-col :span="12" class="pay_button-open" @click.native="paytest">
						<span v-if="vipMarking == 1 || vipMarking == 2">开通会员</span>
						<span v-if="vipMarking == 3">续费会员</span>
					</el-col>
				</el-row>
			</div>
		</div>
		<yd-popup v-model="VipPay.BindMobile" position="center" width="90%">
			<bindmobile></bindmobile>
		</yd-popup>
		<yd-popup v-model="show" position="center" width="90%" height="61%" class="vip_pay">
			<div class="VipShow">
				<p class="VipShow-h1">东华商学VIP会员服务协议</p>
				<yd-icon name="icon-ic_clear" class="VipShow-close" color="rgb(153, 153, 153)" custom size="0.34rem" @click.native="show = false"></yd-icon>
				<div class="VipShow-content">
					<p class="VipShow-content-h1">1. 服务条款的接受与修改</p>
					<p class="VipShow-content-p1">
						1.1 本协议是VIP会员与广东瑞东华教育科技有限公司（下称“东华商学”）之间关于用户成为东华商学VIP会员且使用东华商学提供的VIP会员服务所订立的协议。本协议描述东华商学与VIP会员之间关于软件许可以及服务使用及相关方面的权利义务。“VIP会员”或“您”是指享受东华商学提供的VIP会员服务的个人或单一实体。本服务协议构成您（无论个人或者单位）使用东华商学所提供的VIP会员服务之先决条件，除非您接受本协议全部条款，否则您无权使用本协议的相关服务。您的使用行为（包括但不限于点击同意、进行下一步操作、支付行为等）将视为同意接受本协议各项条款及相关子协议、页面说明或规范流程等全部内容的约束。
					</p>
					<p class="VipShow-content-p1">
						1.2 东华商学有权随时对服务条款进行修改，一旦服务条款发生变更和修改，东华商学将在相关页面上进行公告；如果VIP会员不同意本协议的任一修改，可以取消已经获取的VIP会员服务并停止使用；如果VIP会员继续使用东华商学提供的VIP会员服务，则视为VIP会员已经接受本协议的全部修改。
					</p>
					<p class="VipShow-content-p1">
						1.3 请您仔细审阅本协议的全部内容。未成年人应在法定监护人陪同下审阅和履行，未成年人行使和履行本协议项下的权利和义务视为已获得了法定监护人的认可，您在享受东华商学VIP会员服务时必须完全、严格遵守本服务协议条款。
					</p>
					<p class="VipShow-content-h1">2. 服务说明</p>
					<p class="VipShow-content-p1">
						2.1 东华商学VIP会员服务涉及的东华商学产品/服务的所有权以及相关软件知识产权归东华商学所有，东华商学授予VIP用户一项个人的、非独家的、不可转让的许可，即VIP会员仅享有以上产品/服务和软件的有限使用权。东华商学所提供的服务将按照其服务条款和操作规则严格执行。VIP会员在享受东华商学任何单项服务时，应当受本协议，包括相关子协议、页面说明或规范流程等内容的约束。
					</p>
					<p class="VipShow-content-p1">
						2.2 您应对自身在使用东华商学所提供的服务时的一切行为（无论是否故意）负全部责任。东华商学享有对VIP会员在东华商学及其关联公司提供的服务平台上的一切活动的监督、提示、检查的权利，如VIP会员的行为违反有关法律法规或违反本协议条款的约定，东华商学享有要求其纠正及追究其责任等权利。
					</p>
					<p class="VipShow-content-p1">
						2.3 东华商学向VIP会员提供的全部服务，均仅限于VIP会员在东华商学平台使用，任何以恶意破解等非法手段将东华商学提供的服务内容与东华商学平台分离的行为，均不属于本协议中约定的东华商学提供的服务。由此引起的一切法律后果由行为人负责，与东华商学无关，且东华商学将依法追究行为人的法律责任。
					</p>
					<p class="VipShow-content-p1">
						2.4 当VIP会员使用东华商学各单项服务时，VIP会员的使用行为视为其对各单项服务的服务条款以及东华商学在该单项服务中发出各类公告、页面说明或规范流程等的同意。
					</p>
					<p class="VipShow-content-p1">
						2.5 您明确了解并同意，东华商学VIP会员的付费方式为代收费运营商托收的付款方式，您通过此种付费方式付费可能存在一定的商业风险，包括但不限于不法分子利用您账户或银行卡等有价卡等进行违法活动，该等风险均会给您造成相应的经济损失。您应自行承担向侵权方追究侵权责任和追究责任不能的后果。支付完成后，不可进行转让或退订。
					</p>
					<p class="VipShow-content-p1">
						2.6 您应自行负责妥善且正确地保管、使用、维护您在东华商学申请取得的账户、账户信息及账户密码。您应对您账户信息和账户密码采取必要和有效的保密措施。非东华商学原因致使您账户密码泄漏以及因您保管、使用、维护不当造成损失的，东华商学无须承担与此有关的任何责任。
					</p>
					<p class="VipShow-content-p1">
						2.7 东华商学不对您因第三方的行为或不作为造成的损失承担任何责任，包括但不限于支付服务和网络接入服务、任意第三方的侵权行为或其他违法违规行为。
					</p>
					<p class="VipShow-content-h1">3. 成为VIP会员的程序</p>
					<p class="VipShow-content-p1">
						3.1 在成为东华商学VIP会员之前，您必须先根据真实、准确信息注册成为东华商学用户。用户所填写的内容与个人资料必须真实有效，否则东华商学有权拒绝其申请或撤销其VIP会员资格，并不予任何赔偿或退还VIP会员服务费。VIP会员的个人资料发生变化，应及时修改注册的个人资料，否则由此造成的VIP会员权利不能全面有效行使的责任由VIP会员自己承担，东华商学有权因此取消其VIP会员资格，并不予退还VIP会员服务费或其他任何形式的任何赔偿。
					</p>
					<p class="VipShow-content-p1">
						3.2 用户可通过各种已有和未来新增的渠道成为东华商学VIP会员，包括但不限于：通过网银支付、手机支付或第三方支付等方式成为VIP会员。只有当用户根据页面提示确认愿意并支付了会员服务费后，且通过东华商学审核后，用户方可享受本VIP会员服务。如您拒绝支付该等费用，则不能使用相关的VIP会员服务。在用户使用具体某种方式成为VIP会员时，须阅读并确认接受相关的服务条款和使用方法。东华商学在此声明：东华商学从未授权任何第三方单位或个人销售、转让东华商学VIP会员资格，任何未经授权销售东华商学VIP会员的属于非法销售，东华商学有权追究其法律责任。同时，对于如何成为东华商学VIP会员，东华商学将在相关页面上为用户做出每一步的明确操作提示。
					</p>
					<p class="VipShow-content-p1">
						3.3 成为VIP会员后，VIP会员有权利选择不继续接受东华商学的VIP会员服务，VIP会员可申请取消VIP会员服务，但此取消行为将无法获得已缴纳的VIP会员服务费的退还。
					</p>
					<p class="VipShow-content-p1">
						3.4 东华商学VIP会员账号所有权归东华商学所有，VIP会员仅拥有东华商学账号的有限使用权。
					</p>
					<p class="VipShow-content-p1">
						3.5 东华商学仅提供相关的网络服务，除此之外与相关网络服务有关的设备（如个人电脑、手机、及其他与接入互联网或移动网有关的装置）及所需的费用（如为接入互联网而支付的电话费及上网费、为使用移动网而支付的手机费）均应由VIP会员自行负担。
					</p>
					<p class="VipShow-content-h1">4. VIP会员服务和账号查询</p>
					<p class="VipShow-content-p1">
						4.1 一旦您成为东华商学VIP会员，即视为您认可该项服务标明之价格；成为东华商学VIP会员后，该项服务即时生效。
					</p>
					<p class="VipShow-content-p1">
						4.2 VIP会员的增值服务资费标准以东华商学网站上标注的详细资费标价为准，东华商学有权基于自身业务发展需要变更上述资费标准，但东华商学会根据实际运营情况对不同阶段已经激活且持续有效的VIP会员给予续费、升级方面的不同资费优惠，具体优惠政策以东华商学在相关服务页面公告的内容为准。
					</p>
					<p class="VipShow-content-p1">
						4.3 您可以通过登录东华商学VIP会员中心免费查询您的账号信息详情，包括已开通的服务内容、服务期限、消费金额、交易状态等。
					</p>
					<p class="VipShow-content-h1">5. VIP会员权益及服务期限、收费标准</p>
					<p class="VipShow-content-p1">
						5.1 东华商学VIP会员权益，即东华商学为VIP会员提供的专门服务，包括但不限于VIP教学视频提前看、VIP高清视觉体验、精品课程部分免费观看等。东华商学VIP会员服务分为不同等级，不同会员等级之间的会员权益会存有差异，具体亦以东华商学页面的说明或实际提供为准。
					</p>
					<p class="VipShow-content-p1">
						5.2 VIP会员服务提供的视频等服务都有固定的观看等会员服务期限，您一旦成为VIP会员即视为认可它的观看等服务期限。如您希望享受会员服务连续采购和自动扣费的服务，您可以根据操作指引向我们提出申请。
					</p>
					<p class="VipShow-content-p1">
						5.3 您在购买东华商学VIP会员后可享受的全部权益以东华商学官方网站公布的会员权益为准，东华商学有权基于东华商学自身业务发展需要变更全部或部分会员权益。就前述权益调整东华商学将在相应服务页面进行通知或公告，您也可通过东华商学官方网站或移动端查询最新的会员权益内容。同时我们也鼓励您定期查看本协议内容，以更好地保障您的权益。
					</p>
					<p class="VipShow-content-p1">
						5.4 东华商学致力于不断改善自身服务，力求为您提供愈加优质、性价比更高的产品与服务。东华商学VIP会员服务的收费标准由东华商学根据自身运营策略独立决定（包括不同VIP会员等级的不同收费标准、后续可能的资费调整等），并在会员服务支付页面向您显示。您理解并继续使用的行为（包括但不限于点击同意、进行下一步操作、支付行为等），即视为您知悉并同意该收费标准。
					</p>
					<p class="VipShow-content-h1">6. VIP会员的权利及限制</p>
					<p class="VipShow-content-p1">
						6.1 在VIP会员有效期内，VIP会员可优先参加由东华商学组织的活动并享有由东华商学提供的各项优惠及增值服务。
					</p>
					<p class="VipShow-content-p1">
						6.2 VIP会员服务仅限于申请账号自行使用；VIP会员服务期内不能在东华商学帐号之间转移，禁止赠与、借用、租用、转让或售卖。否则东华商学有权在未经通知的情况下取消转让账户、受让账户的VIP会员服务资格，由此带来的损失由VIP会员自行承担。
					</p>
					<p class="VipShow-content-p1">
						6.3 若VIP会员的任一行为违反本协议或违反国家相关法律法规或监管政策的，或东华商学认为VIP会员行为有损东华商学或他人的声誉及利益，东华商学公司有权在通知VIP会员的情况下取消该VIP会员的VIP会员资格而无须给与任何补偿。
					</p>
					<p class="VipShow-content-p1">
						6.4 VIP会员不得以盗窃、利用系统漏洞等非法途径以及在未获东华商学授权的非法销售东华商学VIP会员的网站上获取或购买VIP会员服务，否则东华商学有权取消VIP会员的服务资格。有此引发的问题由VIP会员自行承担，东华商学不负任何责任。
					</p>
					<p class="VipShow-content-p1">
						6.5 任何VIP会员不得使用带有非法、淫秽、污辱或人身攻击的含义污辱或人身攻击的呢称和签名档，一经发现，东华商学有权取消其VIP会员资格而无需给与任何补偿和退费。
					</p>
					<p class="VipShow-content-p1">
						6.6 被取消VIP会员资格的VIP会员，不能再参加由东华商学组织的活动并不可再享有由东华商学提供的各项优惠及增值服务，即不再享有VIP会员权利。
					</p>
					<p class="VipShow-content-p1">
						6.7 东华商学提供的VIP会员服务内容不得用于商业、盈利或者其他侵犯东华商学合法权益（无论其是否是收费的）等用途。
					</p>
					<p class="VipShow-content-h1">7. 协议的变更</p>
					<p class="VipShow-content-p1">
						7.1 东华商学依据本协议的约定变更服务内容、服务方式以及本用户协议内容的，如果VIP会员不同意东华商学的变更，有权选择取消并停止使用已经获取的对应的全部或部分服务；如果VIP会员继续使用东华商学提供的上述服务，则视为VIP会员已经接受东华商学的上述调整。
					</p>
					<p class="VipShow-content-p1">
						7.2 东华商学对VIP会员协议一旦进行修改，将在页面上公示修改的内容。一经公布即视为通知VIP会员。
					</p>
					<p class="VipShow-content-p1">
						7.3 VIP会员服务提供的视频使用期限中包含东华商学解决故障、服务器维修、调整、升级等所需用的合理时间，对上述情况所需用的时间东华商学不予补偿并保留解释权。
					</p>
					<p class="VipShow-content-p1">
						7.4 VIP会员在使用东华商学所提供的服务时，如遭受任何人身或财务的损失、损害或伤害，不论原因如何，东华商学均不负责任。由于VIP会员将个人密码告知他人或与他人共享注册帐户，由此导致的任何个人资料泄露，东华商学不负任何责任。
					</p>
					<p class="VipShow-content-p1">
						7.5 VIP会员如果不同意条款的修改，可主动向东华商学提出终止VIP会员服务，但东华商学不退还自开通VIP会员服务至提出终止VIP会员服务所在月的已享受VIP会员服务的部分费用；如果VIP会员继续享用VIP会员服务，则视为VIP会员已经接受条款的修改。
					</p>
					<p class="VipShow-content-h1">8. 服务的中断和终止</p>
					<p class="VipShow-content-p1">
						8.1 因发生东华商学不可抗拒的事由，如政府行为、不可抗力，导致VIP会员服务无法继续，东华商学会以最快的速度通知VIP会员，但不承担由此对VIP会员造成的任何损失并不退还VIP会员服务费。
					</p>
					<p class="VipShow-content-p1">
						8.2 如VIP会员违反或被视为违反本服务条款中的内容，东华商学有权在不通知VIP会员的情况下立即终止您已购买的所有服务，以及取消您的东华商学VIP会员账户和使用权限，但不退还任何已缴纳的VIP会员服务费用。
					</p>
					<p class="VipShow-content-p1">
						8.3 东华商学未行使或延迟行使其在本协议项下的权利并不构成对这些权利的放弃，而单一或部分行使其在本协议项下的任何权利并不排斥其任何其它权利的行使。东华商学随时有权要求您继续履行义务并承担相应的违约责任。
					</p>
					<p class="VipShow-content-h1">9. 未成年人条款和隐私政策</p>
					<p class="VipShow-content-p1">
						9.1 东华商学非常注重未成年人的保护。若用户未满18周岁，则为未成年人，应在监护人监护、指导下阅读本协议和使用本VIP会员服务。
					</p>
					<p class="VipShow-content-p1">
						9.2 监护人应指导子女上网应该注意的安全问题，防患于未然。若监护人同意未成年人使用东华商学提供的本VIP会员服务，必须以监护人名义申请消费，并对未成年人使用本会员服务进行正确引导、监督。未成年人行使和履行本协议项下的权利和义务即视为已获得了监护人的认可。
					</p>
					<p class="VipShow-content-p1">
						9.3 东华商学非常重视保护用户个人隐私。未经您的授权同意，东华商学不会向东华商学的关联公司以外的任何公司、组织和个人披露您的个人信息，但法律法规另有规定或本协议另有约定的除外。
					</p>
					<p class="VipShow-content-h1">10．法律的适用和管辖</p>
					<p class="VipShow-content-p1">
						10.1 本服务条款的生效、履行、解释及争议的解决均适用中华人民共和国法律，本服务条款因与中华人民共和国现行法律相抵触而导致部分无效，不影响其他部分的效力。
					</p>
					<p class="VipShow-content-p1">
						10.2 如就本协议内容或其执行发生任何争议，应尽量友好协商解决；协商不成时，则争议各方一致同意将发生的争议提交协商不成时，任何一方均可向北京市海淀区人民法院提起诉讼。
					</p>
					<p class="VipShow-content-h1">11. 其他</p>
					<p class="VipShow-content-p1">
						11.1 如您对本《东华商学VIP会员服务协议》或使用我们的VIP会员服务相关的事宜有任何问题（包括问题咨询、投诉等），请通过功能页面的用户反馈入口或拨打0769-22898086与我们联系，我们会在收到您的意见及建议后尽快向您回复。
					</p>
					<p class="VipShow-content-p2">广东瑞东华教育科技有限公司</p>
				</div>
			</div>
		</yd-popup>
	</div>
</template>

<script>
	import wx from 'weixin-js-sdk'
	import { mapState, mapActions } from 'vuex'
	import bindmobile from './bindmobile.vue'
	const moment = require('moment')
	export default {
		data() {
			return {
				vip: true,
				//用户基础信息
				data: {},
				// 可以购买的订单信息
				orderData: [],
				pay: null,
				wxconfig: {},
				checkbox: [1],
				show: false,
				time: 0
			}
		},
		components: {
			bindmobile
		},
		computed: {
			...mapState({
				GuestProfileData: state => state.classes.GuestProfileData,
				VipPay: state => state.classes.VipPay
			}),
			// 判断显示的标记     1---代表没有开通过vip    2---开通过vip，但是已经过期了    3---开通了vip还未过期 
			vipMarking() {
				if(this.GuestProfileData.guest) {
					if(this.GuestProfileData.guest.vip_name) {
						let myDate = new Date();
						let vipDate = new Date(this.GuestProfileData.guest.vip_end_date);
						if(myDate.getTime() > vipDate.getTime()) {
							return 2
						} else {
							return 3;
							// return this.data.vip_end_date + ' 到期';
						}
					} else {
						return 1
					}
				}
			},
			VipTime() {
				const vip = this.GuestProfileData.guest.vip_end_date
				const time = moment(vip, "YYYY-MM-DD").add('months', this.time).format('YYYY-MM-DD')
				return time
			}
		},
		methods: {
			...mapActions([
				'getGuestProfile'
			]),
			async getData() {
				if(this.GuestProfileData.length == 0) {
					this.loading = true
				}
				await this.getGuestProfile()
				this.loading = false
			},
			vip_price(item, key) {
				let that = this
				this.time = item.expiration
				this.$nextTick(function() {
					this.orderData.forEach(function(item) {　　　　　　　　　　
						that.$set(item, 'active', false);
					})　　　　　　
					this.$set(item, 'active', true);　　　　　　
				})
				this.pay = item
			},
			getVipData() {
				axios.get('/item/vip/lists')
					.then((res) => {
						this.orderData = res.data
					})
					.catch((error) => {
						console.log(error);
					})
			},
			// 基础配置
			wx_config() {
				axios.post('/item/get_wechat_config', {
					'url': window.location.href.split('#')[0]
				}).then((res) => {
					if(res.data.status) {
						wx.config({
							debug: false,
							appId: res.data.config.appId, // 和获取Ticke的必须一样------必填，公众号的唯一标识
							timestamp: res.data.config.timestamp, // 必填，生成签名的时间戳
							nonceStr: res.data.config.nonceStr, // 必填，生成签名的随机串
							signature: res.data.config.paySign, // 必填，签名，见附录1
							jsApiList: ['chooseWXPay']
						});
					} else {
						alert(res.data.message);
					}
				}).catch((error) => {
					console.log(error);
				});
			},
			paytest() {
				let that = this;
				if(!this.GuestProfileData.guest.phone) {
					this.VipPay.BindMobile = true
					return false;
				}
				if(!this.pay) {
					this.$dialog.alert({
						mes: '请选择套餐'
					});
					return false;
				}
				if(this.checkbox.length == 0) {
					this.$dialog.alert({
						mes: '请勾选服务协议'
					});
					return false;
				}

				//处理验证失败的信息
				wx.error(function(res) {
					console.log('error', res);
				});

				//处理验证成功的信息
				wx.ready(function() {
					axios.get('/item/order/' + that.pay.id + '/vip').then((res) => {
						console.log('order', res.data);
						if(res.data.status) {
							wx.chooseWXPay({
								timestamp: res.data.config.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
								nonceStr: res.data.config.nonceStr, // 支付签名随机串，不长于 32 位
								package: res.data.config.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
								signType: res.data.config.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
								paySign: res.data.config.paySign, // 支付签名
								success: function(res) {
									// 支付成功的回调函数
									if(res.errMsg == "chooseWXPay:ok") {
										axios.get('/item/guest/profile')
											.then((res) => {
												console.log(res);
												that.$storage.set('userM', res.data.guest);
												that.$storage.set('messages_count', res.data.messages_count);
												that.$router.push({
													name: 'vipsuccess'
												});
											}).catch((error) => {
												console.log(error)
											});
									} else {
										//alert(JSON.stringify(res));
									}
								},
								cancel: function(res) {
									that.$dialog.notify({
										mes: '取消支付',
										timeout: 2000,
										callback: () => {
											console.log('我走咯！');
										}
									});
								},
								fail: function(res) {
									//alert(JSON.stringify(res));
								}
							});
						} else {
							//alert(res.data.message);
						}

					});
				});
			}
		},
		mounted() {
			this.getData()
			this.getVipData();
			this.wx_config();
		}
	}
</script>
<style lang="less" scoped>
	.VipShow {
		background: #FFFFFF;
		padding: .4rem;
		position: relative;
		&-h1 {
			text-align: center;
			font-size: 18px;
			color: #101010;
		}
		&-close {
			font-size: 0.4rem;
			color: rgb(153, 153, 153);
			position: absolute;
			right: .2rem;
			top: .2rem;
		}
		&-content {
			&-h1 {
				color: rgba(51, 51, 51, 1);
				font-weight: 700;
				margin-top: .3rem;
			}
			&-p1 {
				text-indent: 2em;
				line-height: .45rem;
				margin-top: .2rem;
				font-weight: 400;
				color: rgba(136, 136, 136, 1);
			}
			&-p2 {
				text-align: right;
				padding: .3rem 0;
			}
		}
	}
	
	.pay_group {
		display: inline-block;
	}
	
	.pay_checkbox {
		padding-right: 0;
	}
	
	.VipPay_service {
		margin: .6rem 0;
		text-align: center;
		color: rgb(18, 156, 255);
	}
	
	.VipPay_zhu {
		color: rgb(176, 176, 176);
		background-color: rgb(242, 242, 242);
		border-radius: 2px;
		width: 70%;
		margin: 0 auto;
		padding: .2rem;
		margin-bottom: .5rem;
	}
	
	.VipPay_help {
		width: calc(100% - 1rem);
		margin: 0 auto;
		margin-top: .5rem;
		border-radius: 6px;
		border: 1px solid rgb(200, 200, 200);
		padding: .4rem .25rem;
		font-size: .28rem;
		&-row-right {
			text-align: right;
			color: rgb(176, 176, 176);
		}
	}
	
	.pay_button {
		text-align: center;
		color: #ffffff;
		background-color: rgb(249, 249, 249);
		font-size: 14px;
		position: fixed;
		bottom: 0;
		width: 100%;
		border-top: 1px solid rgb(232, 232, 232);
		&-left {
			padding: .3rem 0;
		}
		&-open {
			padding: .3rem 0;
			background: url(../../assets/pay_button.png) no-repeat;
			background-size: cover;
			color: rgb(86, 84, 79);
		}
	}
	
	.VipPay_line {
		height: 1px;
		width: calc(100% - 1rem);
		background: rgb(227, 227, 227);
		margin: 0 auto;
	}
	
	.pay_height {
		height: 1.2rem;
	}
	
	.clear {
		clear: both;
	}
	
	.pay_top {
		position: relative;
		padding: .5rem;
		&-VipPay {
			width: 100%;
		}
		&-Open {
			width: 71px;
			position: absolute;
			right: .5rem;
			top: .5rem;
		}
	}
	
	.left {
		float: left;
	}
	
	.pay_img {
		width: 51px;
		border-radius: 50%;
	}
	
	.pay_p1 {
		margin-left: .2rem;
		color: #ffffff;
		font-size: 16.0px;
		margin-top: .1rem;
	}
	
	.pay_p2 {
		margin-left: .2rem;
		color: #ffffff;
		margin-top: .1rem;
	}
	
	.pay_p3 {
		margin-left: .2rem;
		color: #ffffff;
	}
	
	.pay_icon {
		margin-left: .1rem;
	}
	
	.vip_freedom {
		background: #ffffff;
		margin-top: .2rem;
		padding: .3rem .2rem .5rem .2rem;
		&-row {
			margin-top: .6rem;
			&-left {
				text-align: center;
			}
			&-right {
				&-p1 {
					font-size: .28rem;
					margin-top: .06rem;
				}
				&-p2 {
					color: rgb(176, 176, 176);
					margin-top: .1rem;
				}
			}
		}
	}
	
	.vip_freedom_p {
		font-size: 15.0px;
		color: #101010;
		margin-bottom: .35rem;
		margin-left: .4rem;
	}
	
	.vip_item_center {
		text-align: center;
	}
	
	.vip_icon {
		font-size: 0.54rem;
		display: block;
		color: #e6c087;
		width: 48px;
		height: 48px;
		margin: 0 auto;
		border-radius: 50%;
		background: #fff2e3;
	}
	
	.vip_icon:before {
		vertical-align: -webkit-baseline-middle;
	}
	
	.vip_item_center span {
		display: block;
		margin-top: .2rem;
	}
	
	.select_pay {
		background: #ffffff;
		padding: .5rem;
		&-right {
			float: right;
			color: rgb(176, 176, 176);
			font-size: .26rem;
		}
	}
	
	.select_p {
		font-size: 16.0px;
	}
	
	.select_pay_content {
		border: 1px solid #e3e3e3;
		border-radius: 6px;
		padding: .25rem;
		margin-top: .25rem;
	}
	
	.select_content_p1 {
		font-size: 0.3rem;
		margin-top: 0.16rem;
	}
	
	.select_content_p2 {
		color: #b0b0b0;
		margin-top: .2rem;
	}
	
	.right {
		float: right;
	}
	
	.select_right_p {
		font-size: 18.0px;
		color: rgb(255, 152, 0);
	}
	
	.select_right_p span {
		font-size: 30px;
	}
	
	.active {
		background-color: rgb(245, 241, 232);
		border: 1px solid rgb(207, 187, 143);
	}
	
	.buy_notes_p1 {
		color: #a6a6a6;
		font-size: 16.0px;
	}
	
	.buy_notes_p2 {
		color: #a6a6a6;
		font-size: 13.0px;
		margin-top: .2rem;
	}
</style>
<style>
	.vip_pay .yd-popup-center {
		overflow-y: scroll;
		height: 60%;
	}
</style>