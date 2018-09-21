package cn.qst.controller;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import cn.qst.comman.fastdfs.FileUploadUtils;
import cn.qst.comman.utils.JsonUtils;

@Controller
public class FileUploadController {
	
	//上传文件的url地址
	@Value("${IMAGE_SERVER_URL}")
	private String IMAGE_SERVER_URL;
	
	//文件上传
	@RequestMapping("/file/upload")
	@ResponseBody
	public String picUpload(MultipartFile uploadFile) {
		try {
			//上传文件获取服务器相对路径
			String path = FileUploadUtils.fileUpload(uploadFile);
			//拼接文件服务器的url(将ip地址带上得到一个完整的网络路径)
			String url = IMAGE_SERVER_URL + path;
			Map<String, Object> result = new HashMap<>();
			result.put("error", 0);
			result.put("url", url);
			return JsonUtils.objectToJson(result);
		} catch (Exception e) {
			e.printStackTrace();
			Map<String, Object> result = new HashMap<>();
			result.put("error", 1);
			result.put("massege", "上传失败");
			return JsonUtils.objectToJson(result);
		}
	}
	
	@RequestMapping("/file/downlowd")
	@ResponseBody
    public String downlowd(String musicurl,@RequestParam(defaultValue="musicfile.mp3")String fileName,@RequestParam(defaultValue="C:\\Users\\Administrator\\Desktop")String savePath) throws IOException {
    	URL httpUrl = new URL(musicurl);  
		HttpURLConnection conn = (HttpURLConnection)httpUrl.openConnection();  
                //设置超时间为3秒
		conn.setConnectTimeout(3*1000);
		//防止屏蔽程序抓取而返回403错误
		conn.setRequestProperty("User-Agent", "Mozilla/4.0 (compatible; MSIE 5.0; Windows NT; DigExt)");
 
		//得到输入流
		InputStream inputStream = conn.getInputStream();  
		//获取自己数组
		byte[] getData = readInputStream(inputStream);    
 
		//文件保存位置
		File saveDir = new File(savePath);
		if(!saveDir.exists()){
			saveDir.mkdir();
		}
		File file = new File(saveDir+File.separator+fileName);    
		FileOutputStream fos = new FileOutputStream(file);     
		fos.write(getData); 
		if(fos!=null){
			fos.close();  
		}
		if(inputStream!=null){
			inputStream.close();
		}
		if(file!=null) {
			return "200";
		}
		return "500";
    }
    
    private  byte[] readInputStream(InputStream inputStream) throws IOException {
        byte[] buffer = new byte[1024];
        int len = 0;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        while((len = inputStream.read(buffer)) != -1) {
            bos.write(buffer, 0, len);
        }
        bos.close();
        return bos.toByteArray();
    }
}
