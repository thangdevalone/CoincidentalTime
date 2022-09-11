
const html__toolbarFilter=`
    <span class="thongke__header">Toolbar</span>
    <div class="tools toolbar__filter">
        <span class="tool filter__days">
            <div class="group">
                <label for="filter__days" class="filter__days--name">Chọn thứ: </label>
                <select name="filter__days" id="tool_1-1">
                    <option value="undefined">All</option>
                    <option value="Thứ hai">Thứ hai</option>
                    <option value="Thứ ba">Thứ ba</option>
                    <option value="Thứ tư">Thứ tư</option>
                    <option value="Thứ năm">Thứ năm</option>
                    <option value="Thứ sáu">Thứ sáu</option>
                    <option value="Thứ bảy">Thứ bảy</option>
                    <option value="Chủ nhật">Chủ nhật</option>
                </select>
            </div>
        </span>
        <span class="tool filter__hours">
            <div class="group">
                <label for="filter__hours" class="filter__hours--name">Chọn giờ: </label>
                <select name="filter__hours" id="tool_1-2">
                    <option value="undefined">All</option>
                    <option value="7:00-8:00">7:00-8:00</option>
                    <option value="8:00-9:00">8:00-9:00</option>
                    <option value="9:00-10:00">9:00-10:00</option>
                    <option value="10:00-11:00">10:00-11:00</option>
                    <option value="11:00-12:00">11:00-12:00</option>
                    <option value="12:00-13:00">12:00-13:00</option>
                    <option value="13:00-14:00">13:00-14:00</option>
                    <option value="14:00-15:00">14:00-15:00</option>
                    <option value="15:00-16:00">15:00-16:00</option>
                    <option value="16:00-17:00">16:00-17:00</option>
                    <option value="17:00-18:00">17:00-18:00</option>
                </select>
            </div>
        </span>
        <span class="tool filter__msv">
            <div class="group">
                <label for="filter__msv" class="filter__msv--name">Nhập mã sinh viên: </label>
                <input type="text" name="filter__msv" id="tool_1-3" placeholder="VD: A41820 ( Bỏ trống là all )">
            </div>
        </span>
        <span class="tool filter__submit">
            <button class="btn btn__tool btn__filter">
                Start filter <i class="fa-solid fa-filter"></i>
            </button>
        </span>
        <div class="tools">
            ! có thể thêm nhiều filter khác như giới tính,lớp,chuyên ngành,... nhưng ở đây tôi chỉ làm 3 cái, sau có thể phát triển thêm
        </div>
    </div>

    <!-- thao tác vơi dữ liệu -->
    <div class="tools toolbar__manipulation">
        <div class=" group tool sort__name">Sắp xếp theo tên:
            <span class="ico ascending__sort"><i class="fa-solid fa-arrow-down-a-z"></i></span>
            <span class="ico descending__sort"><i class="fa-solid fa-arrow-down-z-a"></i></span>
        </div>
        <div class="group tool sort__name">Sắp xếp theo mã sinh viên:
            <span class="ico ascending__sort"><i class="fa-solid fa-arrow-down-1-9"></i></span>
            <span class="ico descending__sort"><i class="fa-solid fa-arrow-down-9-1"></i></span>
        </div>
    </div> 
`
const html__toolbarResuilt=`
<span class="thongke__header">Toolbar</span>
<div class="tools toolbar__feedback">
    <span class="tool feedback__modes">
        <label for="feedback_mode" class="feedback__days--name">Bạn muốn gì: </label>
        <select name="list_mode" id="tool_4-1">
            
            <option value="_1">Tìm ngày có nhiều lượt đăng kí nhất</option>
            <option value="_2">Tìm ngày có it lượt đăng kí nhất</option>
            <option value="_3">Tìm người đăng kí nhiều nhất</option>
            <option value="_4">Tìm người đăng kí ít nhất</option>  
            
            <option value="_5">Tìm những ngày có thể làm việc chung với nhiều thành viên tham gia đông</option>                                      

        </select>
    </span>
    <div class="waitChoose"></div>

    <span class="tool feedback__submit">
        <button class="btn btn__tool btn__feedback">
            Print request 
        </button>
    </span>
    <div style="margin-top:20px;">
        Cảm thấy yêu thích thì folow <a href="https://github.com/thangdevalone" target="_blank" rel="noopener noreferrer">github</a> của mình nữa nhé 
    </div>
</div>
`
const html_resuilt=`
    <span class="thongke__header">Resuilt</span>
    <div class="resuilt__data row-9-10">
                                    
    </div>
`
const html_feedback_options5=`
<span class="waitChoose tool feedback__modes">
        <label for="feedback_mode" class="feedback__days--name">Số ngày tối thiểu trong tuần: </label>
        <select name="feedback_mode" id="tool_4-2">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                </select>
    </span>
`
const html__toolbarList=`
    <span class="thongke__header">Toolbar</span>                   
    <div class="tools toolbar__list">
        <span class="tool list__modes">
            <div class="group">
                <label for="list__mode" class="liss--name">Chọn chế độ list: </label>
                <select name="list_mode" id="tool_2-1">
                    <option value="theothu">Theo thứ</option>
                    <option value="theogio">Theo giờ</option>
                </select>
            </div>
        </span>
        <div class="waitChoose"></div>
       
        <span class="tool list__submit">
            <button class="btn btn__tool btn__list ">
            Start list <i class="fa-solid fa-list"></i>
            </button>
        </span>
    </div>

    <!-- thao tác vơi dữ liệu -->
    <div class="tools toolbar__manipulation">
        <div class="group tool sort__name">Sắp xếp theo số lượng bạn đăng kí:
            <span class="ico ascending__sort"><i class="fa-solid fa-arrow-down-1-9"></i></span>
            <span class="ico descending__sort"><i class="fa-solid fa-arrow-down-9-1"></i></span>
        </div>
    </div> 
    </div>
`
const html__toolbarListHours=`
    <span class="waitChoose tool list__hours">
    <div class="group">
        <label for="list__hours" class="list__hours--name">Chọn giờ: </label>
        <select name="list__hours" id="tool_2-2">
            <option value="7:00-8:00">7:00-8:00</option>
            <option value="8:00-9:00">8:00-9:00</option>
            <option value="9:00-10:00">9:00-10:00</option>
            <option value="10:00-11:00">10:00-11:00</option>
            <option value="11:00-12:00">11:00-12:00</option>
            <option value="12:00-13:00">12:00-13:00</option>
            <option value="13:00-14:00">13:00-14:00</option>
            <option value="14:00-15:00">14:00-15:00</option>
            <option value="15:00-16:00">15:00-16:00</option>
            <option value="16:00-17:00">16:00-17:00</option>
            <option value="17:00-18:00">17:00-18:00</option>
        </select>
    </div>
    </span>
`
const html__toolbarListDays=`
    <span class="waitChoose tool list__days">
    <div class="group">
        <label for="list__days" class="list__days--name">Chọn thứ: </label>
        <select name="list__days" id="tool_2-2">
            <option value="Thứ hai">Thứ hai</option>
            <option value="Thứ ba">Thứ ba</option>
            <option value="Thứ tư">Thứ tư</option>
            <option value="Thứ năm">Thứ năm</option>
            <option value="Thứ sáu">Thứ sáu</option>
            <option value="Thứ bảy">Thứ bảy</option>
            <option value="Chủ nhật">Chủ nhật</option>
        </select>
    </div>
    </span>
`
const oj={
    html__toolbarFilter: html__toolbarFilter,
    html__toolbarList: html__toolbarList,
    html__toolbarListDays: html__toolbarListDays,
    html__toolbarListHours: html__toolbarListHours,
    html__toolbarResuilt: html__toolbarResuilt,
    html__resuilt: html_resuilt,
    html_feedback_options5:html_feedback_options5
}

export default oj

