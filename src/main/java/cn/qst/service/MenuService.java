package cn.qst.service;

import java.util.List;

import cn.qst.pojo.TbMenu;
import cn.qst.pojo.TbMenuContent;
/**
 * 
 * @author daihong
 *
 */
public interface MenuService {
	
	/**
	 * 查询所有的一级菜单
	 * 
	 * @return 返回所有一级菜单
	 */
	public List<TbMenu> queryAll();
	/**
	 * 通过父类id查询父类的子菜单
	 * @param parent 
	 * @return
	 */
	public List<TbMenu> queryByParent(Integer mid);
	/**
	 * 通过id查询菜单
	 * @param mid
	 * @return
	 */
	public TbMenu query(Integer mid);

	/**
	 * 保存主菜单的名称来查询它的子菜单
	 * @param mname
	 * @return
	 */
	public List<TbMenuContent> queryByName();
	
	/**
	 * 查询主页需要的新歌
	 * @return
	 */
	public List<TbMenuContent> queryIndexNew();
	
	/**
	 * 查询主页需要的热歌
	 * @return
	 */
	public List<TbMenuContent> queryIndexHot();
	
	/**
	 * 查询歌手排行
	 */
	public List<TbMenuContent> queryIndexSonger();
}
