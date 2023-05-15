<script setup lang="ts">
import { computed, nextTick, onMounted, reactive } from "vue"
import Request from '../common/request'
type devinfoValueInter = "0" | "1";
interface devinfoDetailsItemTnter {
    value?: string,
    devinfoName?: string,
    keyName?: string,
}
interface devinfoDetailsTnter {
    [key: string]: devinfoDetailsItemTnter;
}
interface stateTnter {
    dialogVisible: boolean;
    isAutoRefresh: boolean;
    firstLoad: boolean;
    loading: boolean;
    value: string;
    devinfoDetails: devinfoDetailsTnter;
    switchValue1: boolean;
    switchValue2: boolean;
    requestUrl: string;
    webUrl: string;
    checkedArr: string[];
}
const devinfoDetailsObj: devinfoDetailsTnter = {
    "1101001": { "devinfoName": 'DI_WEB_NETWORK_BATTERY_CONCEAL', "keyName": "network_battery_conceal" },
    "1101002": { "devinfoName": 'DI_WEB_NETWORK_MOBILENETWORKINFO_CONCEAL', "keyName": "network_mobilenetworkinfo_conceal" },
    "1101003": { "devinfoName": 'DI_WEB_NETWORK_ESIMMANAGE_CONCEAL', "keyName": "network_esimmanage_conceal" },
    "1101004": { "devinfoName": 'DI_WEB_NETWORK_DISPLAYSOLUTION_CONCEAL', "keyName": "network_displaysolution_conceal" },
    "1101005": { "devinfoName": 'DI_WEB_NETWORK_SLICECONFIGURATION_CONCEAL', "keyName": "network_sliceconfiguration_conceal" },
    "1101006": { "devinfoName": 'DI_WEB_NETWORK_CELLHANDOVERPENALTY_CONCEAL', "keyName": "network_cellhandoverpenalty_conceal" },
    "1101007": { "devinfoName": 'DI_WEB_NETWORK_UECONFIGURATION_CONCEAL', "keyName": "network_ueconfiguration_conceal" },
    "1101008": { "devinfoName": 'DI_WEB_NETWORK_TRAFFICSETTING_CONCEAL', "keyName": "network_trafficsetting_conceal" },
    "1101009": { "devinfoName": 'DI_WEB_NETWORK_NFC_CONCEAL', "keyName": "network_nfc_conceal" },
    "1101010": { "devinfoName": 'DI_WEB_NETWORK_WARMCONTROL_CONCEAL', "keyName": "network_warmcontrol_conceal" },
    "1101011": { "devinfoName": 'DI_WEB_NETWORK_AUTOSLEEPSETTINGS_CONCEAL', "keyName": "network_autosleepsettings_conceal" },
    "1101012": { "devinfoName": 'DI_WEB_NETWORK_EXCHANGEPLATFORM_CONCEAL', "keyName": "network_exchangeplatform_conceal" },
    "1101013": { "devinfoName": 'DI_WEB_NETWORK_PARENTCONTROL_CONCEAL', "keyName": "network_parentcontrol_conceal" },
    "1101014": { "devinfoName": 'DI_WEB_NETWORK_WANMODE_CONCEAL', "keyName": "network_wanmode_conceal" },
    "1101015": { "devinfoName": 'DI_WEB_NETWORK_LINKDETECTION_CONCEAL', "keyName": "network_linkdetection_conceal" },
    "1101016": { "devinfoName": 'DI_WEB_NETWORK_YOCTOLOGSWITCH_CONCEAL', "keyName": "network_yoctologswitch_conceal" },
    "1101017": { "devinfoName": 'DI_WEB_NETWORK_MODULEUPDATE_CONCEAL', "keyName": "network_moduleupdate_conceal" },
    "1101018": { "devinfoName": 'DI_WEB_NETWORK_NR_INFO_CONCEAL', "keyName": "network_nr_info_conceal" },
    "1101019": { "devinfoName": 'DI_WEB_NETWORK_NB_INFO_CONCEAL', "keyName": "network_nb_info_conceal" },
    "1101020": { "devinfoName": 'DI_WEB_DHCP_OPTION125_CONCEAL', "keyName": "dhcp_option125_conceal" },
    "1101021": { "devinfoName": 'DI_WEB_CONNTRACK_MAX_CONCEAL', "keyName": "conntrack_max_conceal" },
    "1101022": { "devinfoName": 'DI_WEB_NETWORK_SMARTWIFI_CONCEAL', "keyName": "network_smartwifi_conceal" },
    "1101023": { "devinfoName": 'DI_WEB_WIRELESS_SELECT_CONCEAL', "keyName": "wireless_select_conceal" },
    "1101024": { "devinfoName": 'DI_WEB_INTELLIGENT_LIGHTS_OUT_CONCEAL', "keyName": "intelligent_lights_out" },
    "1101025": { "devinfoName": 'DI_WEB_LOCK_PHYSICAL_CELL_BAND', "keyName": "localPhysicalCellLocking" },
    "1101026": { "devinfoName": 'DI_WEB_DEVICE_IP_PASSTHROUGH_CONCEAL', "keyName": "ipPassthrough" },
    "1101027": { "devinfoName": 'DI_WEB_MULTIPLE_APN_CONCEAL', "keyName": "multipleApnSettings" },
    "1101028": { "devinfoName": 'DI_WEB_DEVICE_VPN_CONCEAL', "keyName": "vpn" },
    "1101029": { "devinfoName": 'DI_WEB_DEVICE_VPN_GRE_CONCEAL', "keyName": "greSettings" },
    "1101030": { "devinfoName": 'DI_WEB_DEVICE_VPN_VXLAN_CONCEAL', "keyName": "vxlanSettings" },
    "1101031": { "devinfoName": 'DI_WEB_DEVICE_VPN_IPSEC_VPN_CONCEAL', "keyName": "ipsecVpn" },
    "1101032": { "devinfoName": 'DI_WEB_DEVICE_VPN_L2TPV3_CONCEAL', "keyName": "l2tpv3Settings" },
    "1101033": { "devinfoName": 'DI_WEB_DEVICE_VOICE_CONCEAL', "keyName": "voiceBasicSettings" },
    "1101034": { "devinfoName": 'DI_WEB_DEVICE_VOICE_ADVANCE_CONCEAL', "keyName": "voiceAdvancedSettings" },
    "1101035": { "devinfoName": 'DI_WEB_DEVICE_VOICE_VOIP_ADVANCE_CONCEAL', "keyName": "voipAdvancedSettings" },
    "1101036": { "devinfoName": 'DI_WEB_DEVICE_VOICE_SPECAL_KEY_CONCEAL', "keyName": "specialKeyCodeSettings" },
    "1101037": { "devinfoName": 'DI_WEB_DEVICE_VOICE_BASIC_CONCEAL', "keyName": "voiceSettings" },
    "1101039": { "devinfoName": 'DI_WEB_DEVICE_SNMP_CONCEAL', "keyName": "snmp" },
    "1101040": { "devinfoName": 'DI_WEB_DEVICE_MESH_CONCEAL', "keyName": "mesh" },
    "1101038": { "devinfoName": 'DI_WEB_DEVICE_TR069_CONCEAL', "keyName": "tr069" },
    "1101041": { "devinfoName": 'DI_WEB_DEVICE_PLATFORM_ONENET_CONCEAL', "keyName": "oneNet" },
    "1101042": { "devinfoName": 'DI_WEB_DEVICE_PLATFORM_MOBILE_DM_CONCEAL', "keyName": "mobileDM" },
    "1101043": { "devinfoName": 'DI_WEB_DEVICE_PLATFORM_TELECOM_DM_CONCEAL', "keyName": "telecomDM" },
    "1101044": { "devinfoName": 'DI_WEB_DEVICE_PLATFORM_UNICOM_DMP_CONCEAL', "keyName": "unicomDMP" },
    "1101045": { "devinfoName": 'DI_WEB_DEVICE_PLATFORM_MQTT_CONCEAL', "keyName": "mqttSettings" },
    "1101046": { "devinfoName": 'DI_WEB_DEVICE_PLATFORM_UIS_CONCEAL', "keyName": "uis" },
    "1101047": { "devinfoName": 'DI_WEB_DEVICE_DATA_SELF_REGISTRATION_CONCEAL', "keyName": "dataSelf" },
    "1101048": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_DDNS_CONCEAL', "keyName": "ddns" },
    "1101049": { "devinfoName": 'DI_WEB_FIREWALL_CONCEAL', "keyName": "firewall" },
    "1101050": { "devinfoName": 'DI_WEB_DEVICE_SIMUNLOCK_CONCEAL', "keyName": "simUnlock" },
    "1101051": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_CONCEAL', "keyName": "systemSettings" },
    "1101052": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_INPORT_EXPORT_CONCEAL', "keyName": "importORExportConfiguration" },
    "1101053": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_ADB_CONCEAL', "keyName": "adbSwitch" },
    "1101054": { "devinfoName": 'DI_WEB_MANAGMENT_FOTA_UPGRADE_CONCEAL', "keyName": "fotaSettings" },
    "1101055": { "devinfoName": 'DI_WEB_MANAGMENT_AUTO_UPGRADE_CONCEAL', "keyName": "systemAutoUpgrade" },
    "1101056": { "devinfoName": 'DI_WEB_DEVICE_VLAN_CONCEAL', "keyName": "valnSettings" },
    "1101057": { "devinfoName": 'DI_WEB_FIREWALL_UPNP_CONCEAL', "keyName": "upnp" },
    "1101058": { "devinfoName": 'DI_WEB_MANAGMENT_LANGCHANGE_CONCEAL', "keyName": "language" },
    "1101059": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_RESET_CONCEAL', "keyName": "restore" },
    "1101060": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_MODEWEBENABEL_CONCEAL', "keyName": "modewebSwotch" },
    "1101061": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_CHANGE_PWD_CONCEAL', "keyName": "changePassword" },
    "1101062": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_CHANGE_USERNAME_CONCEAL', "keyName": "changeUsername" },
    "1101063": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_SYSTIME_CONCEAL', "keyName": "timeSettings" },
    "1101064": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_DST_CONCEAL', "keyName": "dstSettings" },
    "1101065": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_TELNET_CONCEAL', "keyName": "telnetSwitch" },
    "1101066": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_ROUTE_CONCEAL', "keyName": "route" },
    "1101067": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_ARP_CONCEAL', "keyName": "arp" },
    "1101068": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_MODELOG_CONCEAL', "keyName": "modulelogSwitch" },
    "1101069": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_SFP_CONCEAL', "keyName": "sfpIpaSwitch" },
    "1101070": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_COMMLOG_CONCEAL', "keyName": "commlogBackupSetting" },
    "1101071": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_ABN_REST_CONCEAL', "keyName": "abnormalAutomaticRestartSwitch" },
    "1101072": { "devinfoName": 'DI_WEB_MANAGMENT_SYSTEM_TR069_LOG_CONCEAL', "keyName": "tr069LogSwitch" },
    "1101073": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKBAND_CONCEAL', "keyName": "frequencyBand" },
    "1101074": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKBAND_5_CONCEAL', "keyName": "frequencyBand_5" },
    "1101075": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKBAND_4_CONCEAL', "keyName": "frequencyBand_4" },
    "1101076": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKPYH_4_CONCEAL', "keyName": "localPhysicalCellLocking_4" },
    "1101077": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKPYH_5_CONCEAL', "keyName": "localPhysicalCellLocking_5" },
    "1101078": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKPCI_CONCEAL', "keyName": "pciLock" },
    "1101079": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKPCI_4_CONCEAL', "keyName": "pciLock_4" },
    "1101080": { "devinfoName": 'DI_WEB_DEVICE_ADVANCE_LOCKPCI_5_CONCEAL', "keyName": "pciLock_5" },
    "1101081": { "devinfoName": 'DI_WEB_NETWORK_MODE_WIFI_SCAN', "keyName": "wifiScan" },
    "1101082": { "devinfoName": 'DI_WEB_NETWORK_TOOL_NETPORT_CAPTURE', "keyName": "netportCapture" },
    "1101083": { "devinfoName": 'DI_WEB_NETWORK_RANK_TYPE_CAPTURE', "keyName": "rank_type" },
    "1101084": { "devinfoName": 'DI_WEB_NETWORK_BLER_CAPTURE', "keyName": "bler" },
    "1101085": { "devinfoName": 'DI_WEB_NETWORK_SEARCH_NET_CAPTURE', "keyName": "search_network" },
    "1101086": { "devinfoName": 'DI_WEB_AUTO_LIGHTOFF_CAPTURE', "keyName": "auto_light_off" },
    "1101087": { "devinfoName": 'DI_WEB_LINKDETECTION_DNS_CONCEAL', "keyName": "linkdectionway" },
    "1101088": { "devinfoName": 'DI_WEB_LINKDETECTION_NTP_CONCEAL', "keyName": "linkdectntp" },
    "1101089": { "devinfoName": 'DI_WEB_FIRST_LOGIN_CHANGEPWD_CONCEAL', "keyName": "first_login_changepwd" },
}
const treeData: any[] = [
    { id: "1101089", label: '普通账号首次登录修改密码' },
    { id: "1101001", label: '电池图标' },
    { id: "1101058", label: '语言切换功能' },
    {
        id: "1",
        label: '系统状态',
        disabled: true,
        children: [
            { id: "deviceInformation", label: '设备信息', disabled: true },
            {
                id: "wanInformation", label: '网络状态信息', disabled: true,
                children: [
                    { id: "1101019", label: '5G邻区信息' },
                    { id: "1101002", label: '移动网络信息中的5G信息' },
                    { id: "1101083", label: '移动网络信息中的Rank类型' },
                    { id: "1101084", label: '移动网络信息中的下行误码率' },
                ]
            },
            { id: "dhcpInformation", label: 'DHCP状态信息', disabled: true },
            { id: "wifi24GInformation", label: '2.4G Wi-Fi状态信息', disabled: true },
            { id: "wifi5GInformation", label: '5G Wi-Fi状态信息', disabled: true },
            {
                id: "detectionInformation", label: '检测信息', disabled: true,
                children: [{ id: "1101018", label: 'NR 校准信息' }]
            }
        ]
    },
    {
        id: "2",
        label: '网络功能',
        disabled: true,
        children: [
            {
                id: "networkSetting", label: '移动网络配置', disabled: true,
                children: [
                    { id: "networkMode", label: '网络模式', disabled: true },
                    {
                        id: "networkConfiguration", label: '网络配置', disabled: true,
                        children: [
                            { id: "1101085", label: '重新搜网按钮' },
                        ]
                    },
                    { id: "plmnScan", label: 'PLMN扫描', disabled: true },
                    { id: "wanMode", label: 'WAN模式', disabled: true, children: [{ id: "1101014", label: 'WAN模式选项' }] },
                    {
                        id: "1101015", label: '链路检测',
                        children: [
                            { id: "1101087", label: '链路检测方式DNS参数' },
                            { id: "1101088", label: '链路检测方式NTP参数' },
                        ]
                    },
                ]
            },
            { id: "1101081", label: 'WiFi扫描' },
            {
                id: "apnSetting", label: 'APN配置', disabled: true,
                children: [
                    { id: "mainApn", label: '主APN', disabled: true },
                    { id: "1101027", label: '多APN设置' },
                ]
            },
            {
                id: "simFuction", label: 'SIM功能', disabled: true,
                children: [
                    { id: "pinCode", label: 'PIN码', disabled: true },
                    { id: "simSwitch", label: 'SIM卡切换', disabled: true },
                ]
            },
            { id: "1101003", label: 'eSIM管理' },
            { id: "1101004", label: '4/5G显示方案' },
            { id: "1101005", label: '切片配置' },
            { id: "1101006", label: '小区切换惩罚' },
            {
                id: "1101007", label: 'UE配置',
                children: [
                    { id: "ueCapabilityConfig", label: 'UE能力配置', disabled: true },
                    { id: "otherConfiguration", label: '其他配置', disabled: true },
                ]
            },
            { id: "1101008", label: '流量限制' },
        ]
    },
    {
        id: 3,
        label: 'Wi-Fi配置',
        disabled: true,
        children: [
            { id: "1101023", label: 'Wi-Fi切换' },
            { id: "wifi24GSettings", label: '2.4G Wi-Fi配置', disabled: true },
            { id: "wifi24GAdvanceSettings", label: '2.4G Wi-Fi高级设置', disabled: true },
            { id: "wifi5GSettings", label: '5G Wi-Fi配置', disabled: true },
            {
                id: "wifi5GAdvanceSettings", label: '5G Wi-Fi高级设置', disabled: true,
                children: [
                    { id: "advanceSettings", label: '5G Wi-Fi高级设置', disabled: true },
                    { id: "ptc", label: '5G Wi-Fi TPC', disabled: true },
                ]
            },
            {
                id: "wpsSettings", label: 'WPS配置', disabled: true,
                children: [
                    { id: "wpsSettings24G", label: '2.4G WPS配置', disabled: true },
                    { id: "wpsSettings5G", label: '5G WPS配置', disabled: true },
                ]
            },
            {
                id: "wifiBlackOrWhiteList", label: 'Wi-Fi黑白名单', disabled: true,
                children: [
                    { id: "blackWhiteList24G", label: '2.4G 黑白名单', disabled: true },
                    { id: "blackWhiteList5G", label: '5G 黑白名单', disabled: true },
                ]
            },
            { id: "1101009", label: 'NFC配置' },
        ]
    },
    {
        id: 4,
        label: '设备配置',
        disabled: true,
        children: [
            {
                id: "dhcpSettings", label: "DHCP配置", disabled: true,
                children: [
                    { id: "mainDhcpSetting", label: "主DHCP设置", disabled: true, children: [{ id: "1101020", label: "Option125服务" }] },
                    { id: "multipleDhcpSetting", label: '多DHCP设置', disabled: true },
                ]
            },
            { id: "1101056", label: 'VLAN配置' },
            {
                id: "1101066", label: '路由配置',
                children: [
                    { id: "staticRoutingTable", label: "静态路由表", disabled: true },
                    { id: "1101067", label: 'ARP老化时间' },
                ]
            },
            { id: "1101010", label: '温控配置' },
            {
                id: "1101028", label: 'VPN配置',
                children: [
                    { id: "vpn", label: "VPN配置", disabled: true },
                    { id: "1101029", label: 'GRE配置' },
                    { id: "1101032", label: 'L2TPV3配置' },
                    { id: "1101030", label: 'VXLAN配置' },
                    { id: "1101031", label: 'IPSec VPN' },
                    { id: "vpn6", label: '状态', disabled: true },
                ]
            },
            {
                id: "1101033", label: '语音配置',
                children: [
                    { id: "1101037", label: "语音设置" },
                    { id: "1101034", label: '语音高级配置' },
                    { id: "1101035", label: 'VoIP高级配置' },
                    { id: "1101036", label: '特殊代码配置' },
                ]
            },
            { id: "1101038", label: 'TR069' },
            { id: "1101011", label: '自动休眠配置' },
            { id: "1101039", label: 'SNMP' },
            {
                id: "1101012", label: '对接平台',
                children: [
                    { id: "1101041", label: "OneNET" },
                    { id: "1101042", label: '移动DM' },
                    { id: "1101043", label: '电信DM' },
                    { id: "1101044", label: '联通DMP' },
                    { id: "1101045", label: 'MQTT配置' },
                ]
            },
            { id: "1101026", label: 'IP Passthrough' },
            {
                id: "advancedSettings", label: '高级配置', disabled: true,
                children: [
                    { id: "1101048", label: "DDNS" },
                    {
                        id: "1101073", label: '锁频段',
                        children: [
                            { id: "1101075", label: "4G锁频段" },
                            { id: "1101074", label: '5G锁频段' },
                        ]
                    },
                    {
                        id: "1101025", label: '锁物理小区',
                        children: [
                            { id: "1101076", label: "4G锁小区" },
                            { id: "1101077", label: '5G锁小区' },
                        ]
                    },
                    {
                        id: "1101078", label: 'PCI锁定',
                        children: [
                            { id: "1101079", label: "4G PCI锁定ID列表" },
                            { id: "1101080", label: '5G PCI锁定ID列表' },
                        ]
                    },
                ]
            },
            { id: "1101050", label: 'SIM Unlock' },
            {
                id: "1101040", label: 'MESH',
                children: [
                    { id: "MESH1", label: "基本配置", disabled: true },
                    { id: "MESH2", label: '高级设置', disabled: true },
                    { id: "MESH3", label: 'Action', disabled: true },
                    { id: "MESH4", label: '状态', disabled: true },
                ]
            },
        ]
    },
    {
        id: "sms",
        label: '短信',
        disabled: true,
        children: [
            { id: "sms1", label: '收件箱', disabled: true },
            { id: "sms2", label: '发件箱', disabled: true },
            { id: "sms3", label: '短信设置', disabled: true },
        ]
    },
    {
        id: "1101049",
        label: '防火墙设置',
        children: [
            { id: "firewallsetting", label: '防火墙安全设置', disabled: true },
            { id: "DMZ", label: 'DMZ', disabled: true },
            { id: "portForwarding", label: '端口转发', disabled: true },
            {
                id: "filteringRules", label: '过滤规则', disabled: true,
                children: [
                    { id: "filteringRules1", label: "默认设置", disabled: true },
                    { id: "filteringRules2", label: '端口过滤', disabled: true },
                    { id: "filteringRules3", label: 'IP-Port过滤', disabled: true },
                    { id: "filteringRules4", label: 'MAC过滤', disabled: true },
                ]
            },
            {
                id: "urlFilter", label: 'URL过滤', disabled: true,
                children: [
                    { id: "urlFilter1", label: "默认设置", disabled: true },
                    { id: "urlFilter2", label: 'URL过滤', disabled: true },
                ]
            },
            { id: "ipMacBinding", label: 'IP MAC绑定', disabled: true },
            { id: "ddosProtection", label: 'DDOS防护', disabled: true },
            { id: "speedLimit", label: '网速限制', disabled: true },
            { id: "1101057", label: 'UPNP' },
            { id: "remoteWebSettings", label: '远程网络设置', disabled: true },
            { id: "accessControl", label: '访问控制', disabled: true },
        ]
    },
    {
        id: "1101013",
        label: '家长控制',
        children: [
            { id: "parent1", label: '家长模式', disabled: true },
            { id: "parent2", label: '网址限制', disabled: true },
            { id: "parent3", label: '时间限制', disabled: true },
            { id: "parent4", label: '网络限速', disabled: true },
        ]
    },
    {
        id: "sys",
        label: '系统管理',
        disabled: true,
        children: [
            {
                id: "1101051",
                label: "系统设置",
                children: [
                    {
                        id: "systemSettings1", label: "系统设置", disabled: true,
                        children: [
                            { id: "1101059", label: "恢复出厂" },
                            { id: "1101060", label: "模块网页开关" },
                        ]
                    },
                    { id: "1101061", label: "修改密码" },
                    { id: "1101062", label: "修改用户名" },
                    { id: "1101063", label: "系统时间设置" },
                    { id: "1101064", label: "夏令时设置" },
                    { id: "1101052", label: "导入/导出配置" },
                    { id: "1101065", label: "Telnet开关" },
                    { id: "1101068", label: "模块LOG开关" },
                    { id: "1101053", label: "ADB开关" },
                    { id: "1101069", label: "网络加速" },
                    { id: "1101070", label: "COMMLOG备份设置" },
                    { id: "1101071", label: "异常自动重启开关" },
                    { id: "1101072", label: "TR069 LOG开关" },
                    { id: "1101016", label: "YOCTO LOG开关" },
                    { id: "1101017", label: "模块升级" },
                    { id: "1101021", label: "Nf Conntrack Max" },
                ]
            },
            {
                id: "smartSettings", label: '智能设置', disabled: true,
                children: [
                    { id: "smartSettings1", label: '智能重启', disabled: true },
                    { id: "1101024", label: '智能熄灯' },
                    { id: "1101086", label: '自动熄灯' },
                ]
            },
            { id: "systemLog", label: '系统日志', disabled: true },
            { id: "exportLog", label: '日志导出', disabled: true },
            { id: "lOGInformation", label: 'LOG信息', disabled: true },
            { id: "systemUpgrade", label: '系统升级', disabled: true },
            { id: "1101054", label: 'FOTA升级设置' },
            { id: "1101055", label: '系统自动升级' },
            { id: "configUpgrade", label: '配置升级', disabled: true },
            { id: "atCommand", label: 'AT接口', disabled: true },
            {
                id: "networkTools", label: '网络工具', disabled: true,
                children: [
                    { id: "networkTools1", label: 'Ping', disabled: true },
                    { id: "1101082", label: '抓包' },
                    { id: "networkTools3", label: 'Trace', disabled: true },
                    { id: "networkTools4", label: '远程抓包设置', disabled: true },
                ]
            },
            { id: "help", label: '帮助', disabled: true },
        ]
    },
]
const defaultProps = {
    children: 'children',
    label: 'label'
}
const options = [
    { value: '0', label: '都不显示' },
    { value: '1', label: '高级账户' },
    { value: '2', label: '普通、高级账户' },
    { value: '3', label: '都显示' },
]
const state = reactive<stateTnter>({
    dialogVisible: false,
    isAutoRefresh: false,
    firstLoad: true,
    loading: true,
    value: '3',
    devinfoDetails: {},
    switchValue1: true,
    switchValue2: true,
    requestUrl: "http://192.168.0.1/cgi-bin/http.cgi",
    webUrl: "http://192.168.0.1",
    checkedArr: [],
})
const showDevinfoDetails = computed(() => {
    if (state.switchValue1) {
        let result: devinfoDetailsTnter = {}
        for (let key in state.devinfoDetails) {
            if (state.devinfoDetails[key].value == '1') {
                result[key] = state.devinfoDetails[key]
            }
        }
        return result
    } else {
        return state.devinfoDetails
    }
})
const refresh = () => {
    state.isAutoRefresh = true
    nextTick(() => {
        state.isAutoRefresh = false
    })
}
const exportDevinfo = () => {
    let data = devinfoDetailsObj
    for (let key in data) {
        if (state.checkedArr.indexOf(key) != -1) {
            data[key].value = "1"
        }
    }
    state.devinfoDetails = data
    state.dialogVisible = true
}
const getData = async () => {
    state.loading = true
    state.firstLoad = true
    const res: any = await Request.request_get(1010)
    state.loading = false
    state.checkedArr = res?.resultList || []
    nextTick(() => {
        state.firstLoad = false
    })
}
const postData = (devinfoId: string, devinfoValue: devinfoValueInter) => {
    Request.request_post(1010, { devinfoId, devinfoValue }).then(res => {
        state.loading = false
    })
}
const check = (e: any, type: boolean) => {
    if (!state.firstLoad) {
        console.log("devinfo ", e.id, type ? "1" : "0")
        state.loading = e.id
        postData(e.id, type ? "1" : "0")
    }
}
onMounted(getData)
</script>

<template>
    <div id="index">
        <el-drawer v-model="state.dialogVisible" direction="rtl" :size="state.switchValue2 ? '60%' : '30%'">
            <template #header>
                <div style="display: flex;align-items: center;">
                    <label for="" style="margin-right: 20px;">只显示值为1的Devinfo:</label>
                    <el-switch v-model="state.switchValue1"></el-switch>
                    <label for="" style="margin-right: 20px;margin-left: 50px;">是否显示详情:</label>
                    <el-switch v-model="state.switchValue2"></el-switch>
                </div>
            </template>
            <div style="padding: 20px;">
                <div v-for="(item, key) in showDevinfoDetails" :key="key">
                    <span>{{ key }}</span> =
                    <span :style="item.value == '1' ? 'color: green;' : 'color: red;'">{{ item.value || "0" }}</span>
                    <template v-if="state.switchValue2"> =====>
                        <span>{{ item.devinfoName }}</span> ----->
                        <span>{{ item.keyName }}</span>
                    </template>
                    <br />
                </div>
            </div>
        </el-drawer>
        <div class="left" v-loading="state.loading" element-loading-text="拼命加载中"
            element-loading-background="rgba(0, 0, 0, 0.8)">
            <div>
                <el-input v-model="state.requestUrl" placeholder="请输入内容">
                    <template #append>
                        <el-button @click="getData" icon="RefreshRight" style="font-size: 20px;font-weight: bold;"
                            title="刷新数据"></el-button>
                    </template>
                </el-input>
                <el-tree :check-strictly="true" :data="treeData" show-checkbox node-key="id" class="config-tree"
                    :default-checked-keys="state.checkedArr" :props="defaultProps" @check-change="check"
                    v-loading="state.loading" :default-expanded-keys="state.checkedArr">
                    <template #default="{ node }">
                        <div class="custom-tree-node">
                            <span>{{ node.label }}</span>
                            <el-select :value="state.value" placeholder="请选择" size="mini" class="tree-node-select"
                                :disabled="true">
                                <el-option v-for="item in options" :key="item.value" :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </template>
                </el-tree>
            </div>
            <el-button type="primary" @click="exportDevinfo">导出Devinfo</el-button>
        </div>
        <div class="right">
            <div class="right-header">
                <el-input placeholder="请输入内容" v-model="state.webUrl" class="input-with-select">
                    <template #prepend>
                        <el-button @click="refresh" icon="RefreshLeft" style="font-size: 20px;font-weight: bold;"
                            title="刷新网页"></el-button>
                    </template>
                </el-input>
            </div>
            <div class="right-body">
                <iframe :src="state.webUrl" width="100%" height="100%" scrolling="no" frameborder="no" id="iframe"
                    v-if="!state.isAutoRefresh">
                </iframe>
            </div>
        </div>
    </div>
</template>
<style>
#index {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #fff;
    border-radius: 10px;
}

.el-drawer__header {
    margin-bottom: 0 !important;
}

div::-webkit-scrollbar {
    width: 0.4rem !important;
}

div::-webkit-scrollbar-thumb {
    background: #ccc;
    cursor: pointer;
    border-radius: 10px;
}

.config-tree {
    width: 100%;
}

.left {
    padding: 20px;
    height: 100%;
    width: 450px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;
}

.right {
    height: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
}

#iframe {
    border: #ccc 1px solid;
    border-radius: 6px;
    background-color: #ccc;
}

.right-header {
    width: 100%;
    margin-bottom: 10px;
}

.right-body {
    width: 100%;
    flex: 1;
}

.el-tree-node {
    margin-top: 20px;
    margin-bottom: 10px;
}

.custom-tree-node {
    display: flex;
    align-items: center;
}

.custom-tree-node>span {
    margin-right: 10px;
}

.tree-node-select {
    width: 100px;
}
</style>