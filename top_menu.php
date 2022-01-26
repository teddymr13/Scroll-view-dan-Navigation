<div class="filler_filter hide"></div>
<div id="top_filter">
    <div class="section group">
        <div id="top_header_separator" class="span_24_of_24 col">
            <div class="line-style1"></div>
        </div>
        
        <div class="inner-section">
            <div class="span_2_of_24 col filler_col"></div>
            <div class="nav-header header" id="arrow"> 
             <div class="nav middle scrollers item">
                <?php

                $echoSeparator = false;

                if ($_SESSION['halaman'] >= 2 && $_SESSION['halaman'] <= 10) {
                    if ((isset($listSearch) && $listSearch) || (($_SESSION['halaman'] == 2 || $_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && isset($listProduct) && $listProduct)) {
                        $link_back_to_index = $url_iso_country . "/" . MainHelper::getStrPage('url') . "/";
                        ?>
                        <a class="a_filter trigger_filter filler_col" href="<?php echo $link_back_to_index; ?>">
                            <?php echo "Back to " . MainHelper::getStrPage() . " Index"; ?>
                        </a>
                        <a class="a_filter trigger_filter mobile_col items-menu" href="<?php echo $link_back_to_index; ?>" id="trigger_home">
                            &nbsp;&nbsp;&nbsp;<span class="glyphicon glyphicon-home mobile_col" aria-hidden="true"></span>
                        </a>
                        <?php
                        $echoSeparator = true;
                    }

                    if (isset($listSearch) && $listSearch) {
                        if ($echoSeparator) echo "&nbsp;|&nbsp;";
                        else $echoSeparator = true;
                        ?>
                        <a class="a_filter trigger_filter items-menu" id="trigger_filter_2">FILTERS</a>
                        <?php
                    }
                    else {
                        if ((($_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && !isset($listProduct)) || $_SESSION['halaman'] == 5 || $_SESSION['halaman'] == 6 || $_SESSION['halaman'] == 10) {
                            if ($echoSeparator) echo "&nbsp;|&nbsp;";
                            // $_SESSION['halaman'] == 3 ||
                            else $echoSeparator = true;
                            ?>
                            <a class="a_filter trigger_filter items-menu" id="trigger_filter_1">LOCATION</a>
                            <?php
                        }

                        if ((($_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && !isset($listProduct)) || $_SESSION['halaman'] == 5 || $_SESSION['halaman'] == 6 || $_SESSION['halaman'] == 8 || $_SESSION['halaman'] == 10) {
                            // $_SESSION['halaman'] == 3 || 
                            if ($echoSeparator) echo "&nbsp;|&nbsp;";
                            else $echoSeparator = true;
                            ?>
                            <a class="a_filter trigger_filter items-menu" id="trigger_filter_2">CATEGORIES</a>
                            <?php
                        }

                        if ($_SESSION['halaman'] == 8) {
                            if ($echoSeparator) echo "&nbsp;|&nbsp;";
                            else $echoSeparator = true;
                            ?>
                            <a class="a_filter trigger_filter items-menu" id="trigger_filter_1">TITLES</a>
                            <?php
                        }

                        if ((($_SESSION['halaman'] == 2 && !isset($id_brand)) || $_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9)) {
                            if ($echoSeparator) echo "&nbsp;|&nbsp;";
                            else $echoSeparator = true;
                            ?>
                            <a class="a_filter trigger_filter items-menu" id="trigger_filter_3">PRODUCTS</a>
                            <?php
                        }

                        if (($_SESSION['halaman'] == 2 && ((isset($listProduct) && $listProduct && isset($id_brand) && !empty($id_brand)) || (!isset($listProduct) && !isset($id_brand)))) || (($_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && isset($listProduct) && $listProduct)) {
                            if ($echoSeparator) echo "&nbsp;|&nbsp;";
                            else $echoSeparator = true;
                            ?>
                            <a class="a_filter trigger_filter items-menu" id="trigger_filter_1">BRANDS</a>
                            <?php
                        }

                        if ($_SESSION['halaman'] == 2 && isset($listProduct) && $listProduct) {
                            if ($echoSeparator) echo "&nbsp;|&nbsp;";
                            else $echoSeparator = true;
                            ?>
                            <a class="a_filter trigger_filter items-menu" id="trigger_filter_2">FILTERS</a>
                            <?php
                        }

                        if ($_SESSION['halaman'] == 7) {
                            if (isset($articletype) && ($articletype == 1 || $articletype == 2 || $articletype == 3 || $articletype == 4|| $articletype == 5)) {
                                ?>
                                <a class="a_filter trigger_filter items-menu" id="trigger_filter_2">CATEGORIES</a>
                            
                                        <!--&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
                                            <a class="a_filter trigger_filter" id="trigger_filter_1">LOCATION</a>-->
                                            <?php
                                        }
                                        else {
                                            $separator = false;
                                            for ($i = 1; $i <= 5; $i++) {
                                                if ($i == 1) {
                                                    $strnya = "LATEST LUXURY";
                                                    $url_str = "latest-luxury";
                                                }
                                                if ($i == 2) {
                                                    $strnya = "EVENTS";
                                                    $url_str = "events";
                                                }
                                                if ($i == 3) {
                                                    $strnya = "INSPIRING PEOPLE";
                                                    $url_str = "inspiring-people";
                                                }
                                                if ($i == 4) {
                                                    $strnya = "PROMOTIONS";
                                                    $url_str = "promotions";
                                                }
                                                if ($i == 5) {
                                                    $strnya = "SAVE THIS DATE";
                                                    $url_str = "save-this-date";
                                                }
                                                if (isset($top_menu_categories_check_child[$i]) && $top_menu_categories_check_child[$i]) {
                                                    if ($separator) echo '&nbsp;|&nbsp';
                                                    ?>
                                                    <a class="a_filter trigger_filter"
                                                    href="<?php echo $url_iso_country . '/newsfeed/' . $url_str . '/'; ?>"><?php echo $strnya; ?></a>
                                                    <?php
                                                    $separator = true;
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            ?>
                        </div>
                        <span id="trigger_search" class="glyphicon glyphicon-search trigger_filter" aria-hidden="true"></span>
                    </div>
                    <div class="span_22_of_24"></div>
                </div>
            </div>

            <div class="section group">
                <div class="span_24_of_24 col">
                    <div class="line-style2"></div>
                </div>
            </div>

            <div id="container_top_filter" class="section group">
                <?php
                if ($_SESSION['halaman'] >/*=*/ 2 && $_SESSION['halaman'] <= 10) {
                    if (isset($listSearch) && $listSearch) {
                        if($_SESSION['halaman'] <= 6 || $_SESSION['halaman'] == 9) {
                            if (($_SESSION['halaman'] == 2 || $_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && isset($listProductSearch) && $listProductSearch)
                                require_once "views/includes/top_menu_product_filters.php";
                            else
                                require_once "views/includes/top_menu_search_filters.php";
                        }
                        if($_SESSION['halaman']==7)
                            require_once "views/newsfeed/top_menu_newsfeed_search_filters.php";
                        if($_SESSION['halaman']==8)
                            require_once "views/magazine/top_menu_magazine_search_filters.php";
                        if($_SESSION['halaman']==10)
                            require_once "views/evoucher/top_menu_voucher_search_filters.php";
                    }
                    else {
                //1
                        if ((($_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 9) && !isset($listProduct)) || $_SESSION['halaman'] == 5 || $_SESSION['halaman'] == 6)
                            require_once "views/includes/top_menu_locations.php";
                        if (($_SESSION['halaman'] == 4 && !isset($listProduct)) /*|| ($_SESSION['halaman'] == 7 && isset($articletype) && ($articletype == 1 || $articletype == 2 || $articletype == 3))*/ || $_SESSION['halaman'] == 10)
                            require_once "views/includes/top_menu_cities.php";
                        if (($_SESSION['halaman'] == 2 && ((isset($listProduct) && $listProduct && isset($id_brand) && !empty($id_brand)) || (!isset($listProduct) && !isset($id_brand)))) || (($_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && isset($listProduct) && $listProduct) || $_SESSION['halaman'] == 8)
                            if ($_SESSION['halaman'] == 8 && isset($ajax_param) && !empty($ajax_param))
                                require_once "views/magazine/top_menu_magazine_brands.php";
                            else
                                require_once "views/includes/top_menu_product_brands.php";
                //2
                            if ($_SESSION['halaman'] == 2 && isset($listProduct) && $listProduct)
                                require_once "views/includes/top_menu_product_filters.php";
                            if ((($_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && !isset($listProduct)) || $_SESSION['halaman'] == 5 || $_SESSION['halaman'] == 6)
                                require_once "views/includes/top_menu_categories.php";
                            if ($_SESSION['halaman'] == 7 && isset($articletype) && ($articletype == 1 || $articletype == 2 || $articletype == 3||$articletype == 4 ||$articletype == 5))
                                require_once "views/newsfeed/top_menu_newsfeed_categories.php";
                            if ($_SESSION['halaman'] == 8)
                                require_once "views/magazine/top_menu_magazine_categories.php";
                            if ($_SESSION['halaman'] == 10)
                                require_once "views/evoucher/top_menu_voucher_categories.php";
                //3
                            if (($_SESSION['halaman'] == 2 || $_SESSION['halaman'] == 3 || $_SESSION['halaman'] == 4 || $_SESSION['halaman'] == 9) && !isset($id_brand))
                                require_once "views/includes/top_menu_product_categories.php";
                        }
            //search
                        require_once "views/includes/top_menu_search.php";
                    }
                    ?>
                </div>
            </div>