package cn.qst.comman.fastdfs;


import org.springframework.web.multipart.MultipartFile;

public class FileUploadUtils {
	//上传图片的url地址
	
	public static String fileUpload(MultipartFile uploadFile) throws Exception {
		//通过图片服务器的配置文件初始化文件上传客户端
		FastDFSClient fastDFSClient = new FastDFSClient("classpath:fastdfs/client.conf");
		//获取文件名
		String originalFilename = uploadFile.getOriginalFilename();
		//截取后缀
		String extName = originalFilename.substring(originalFilename.lastIndexOf(".")+1);
		//上传文件 返回一个图片路径(不带服务器的ip地址)
		String path = fastDFSClient.uploadFile(uploadFile.getBytes(), extName);
		return path;
	}
	
	//文件上传
	public static String fileUpload(String str , String extName) {
		try {
			//通过图片服务器的配置文件初始化文件上传客户端
			FastDFSClient fastDFSClient = new FastDFSClient("classpath:fastdfs/client.conf");
			//上传文件 返回一个图片路径(不带服务器的ip地址)
			String path = fastDFSClient.uploadFile(str.getBytes(),extName);
			return path;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * 比特流上传图片
	 * @param bytes 比特数据
	 * @param extName 文件后缀名
	 * @return
	 */
	public static String fileUpload(byte[] bytes ,String  extName) {
		try {
			if(extName==null) {
				extName = "jpg";
			}
			//通过图片服务器的配置文件初始化文件上传客户端
			FastDFSClient fastDFSClient = new FastDFSClient("classpath:fastdfs/client.conf");
			//上传文件 返回一个图片路径(不带服务器的ip地址)
			String path = fastDFSClient.uploadFile(bytes, extName);
			return path;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
}
