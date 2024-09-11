import {FileTypeEnum} from "../../../common/file.pojo";
import {getFileNameByLocation} from "../component/file/FileUtil";
import {fileHttp} from "./config";
import {NotyFail} from "./noty";
import {getEditModelType} from "../../../common/StringUtil";
import {getFileFormat} from "../../../common/FileMenuType";
import {getRouterAfter} from "./WebPath";
import {RCode} from "../../../common/Result.pojo";
import {useRecoilState} from "recoil";
import {$stroe} from "./store";
import {saveTxtReq} from "../../../common/req/file.req";
import {useTranslation} from "react-i18next";




export const user_click_file = () => {
    const [editorSetting, setEditorSetting] = useRecoilState($stroe.editorSetting);
    const [file_preview, setFilePreview] = useRecoilState($stroe.file_preview)
    const [markdown, set_markdown] = useRecoilState($stroe.markdown)
    const { t } = useTranslation();

     const click_file = async (param:{name,context?:string,model?:string})=> {
        const {name,context} = param;
        const model_type = getEditModelType(name);
        const model = !model_type ? param.model :model_type;
        const type = getFileFormat(name);
        if (model) {
            // 双击文件
            let value;
            if (context) {
                value = context;
            } else {
                const rsq = await fileHttp.get(`${getRouterAfter('file', location.pathname)}${name}`)
                if (rsq.code === RCode.File_Max) {
                    NotyFail("超过20MB");
                    return;
                }
                value = rsq.data;
            }
            if (type === FileTypeEnum.md && param.model !=="text") {
                set_markdown({context: value, filename: name})
                return;
            }
            setEditorSetting({
                model,
                open: true,
                fileName: name,
                save: async (context) => {
                    const data: saveTxtReq = {
                        context
                    }
                    const rsq = await fileHttp.post(`save/${getRouterAfter('file', location.pathname)}${name}`, data)
                    if (rsq.code === 0) {
                        editor_data.set_value_temp('')
                        // setEditorSetting({open: false, model: '', fileName: '', save: null})
                    }
                }
            })
            editor_data.set_value_temp(value)
            return;
        } else {
            let url = fileHttp.getDownloadUrl(getFileNameByLocation(location, name));
            switch (type) {
                case FileTypeEnum.video:
                case FileTypeEnum.image:
                case FileTypeEnum.pdf:
                    setFilePreview({open: true, type: type, name, url})
                    break;
                case FileTypeEnum.unknow:
                default:
                    NotyFail(t("未知类型、请使用右键文件"))
                    break;
            }

        }

    }

    return {click_file};
}

export class editor_data {

    static cache_str:string = "";

    public static set_value_temp(v:string){
        editor_data.cache_str = v;
    }
    public static get_value_temp() {
        return editor_data.cache_str;
    }

    public static set_value(v:string,filename?:string){
        if (filename) {
            localStorage.setItem(filename, v);
        } else {
            localStorage.setItem("cache_str",v);
        }
    }
    public static get_value(filename?:string) {
        if (filename) {
            localStorage.getItem(filename);
        } else {
            localStorage.getItem("cache_str");
        }
    }
    public static delete_value(filename?:string) {
        if (filename) {
            localStorage.removeItem(filename);
        } else {
            localStorage.removeItem("cache_str");
        }
    }
}


// 将 Base64 数据分成多个片段
export function createChunks(base64Str, size) {
    const chunks = [];
    let index = 0;

    while (index < base64Str.length) {
        chunks.push(base64Str.slice(index, index + size));
        index += size;
    }

    return chunks;
}